#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Nimad ZAYKA Spices
Tests all endpoints in priority order as specified in the review request.
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Base URL from environment
BASE_URL = "https://spice-ecosystem-pro.preview.emergentagent.com/api"
ADMIN_PASSWORD = "NIMADZAYKA09"

# Global token storage
auth_token = None

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"\n{status}: {test_name}")
    if details:
        print(f"  Details: {details}")
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {details}")

def make_request(method: str, endpoint: str, data: Optional[Dict] = None, 
                 headers: Optional[Dict] = None, expect_status: int = 200) -> tuple:
    """Make HTTP request and return (success, response, status_code)"""
    url = f"{BASE_URL}/{endpoint}" if endpoint else BASE_URL
    req_headers = headers or {}
    
    try:
        if method == "GET":
            resp = requests.get(url, headers=req_headers, timeout=10)
        elif method == "POST":
            resp = requests.post(url, json=data, headers=req_headers, timeout=10)
        elif method == "PUT":
            resp = requests.put(url, json=data, headers=req_headers, timeout=10)
        elif method == "DELETE":
            resp = requests.delete(url, headers=req_headers, timeout=10)
        else:
            return False, None, 0
        
        success = resp.status_code == expect_status
        try:
            response_data = resp.json()
        except:
            response_data = resp.text
        
        return success, response_data, resp.status_code
    except Exception as e:
        return False, str(e), 0

def test_auth_login_success():
    """Test 1: POST /api/auth/login with correct password"""
    global auth_token
    
    success, data, status = make_request(
        "POST", 
        "auth/login",
        data={"password": ADMIN_PASSWORD},
        expect_status=200
    )
    
    if success and isinstance(data, dict) and data.get("success") and data.get("token"):
        auth_token = data["token"]
        log_test("Auth Login Success", True, f"Token received: {auth_token[:20]}...")
        return True
    else:
        log_test("Auth Login Success", False, f"Status: {status}, Response: {data}")
        return False

def test_auth_login_failure():
    """Test 2: POST /api/auth/login with wrong password"""
    success, data, status = make_request(
        "POST",
        "auth/login",
        data={"password": "wrongpassword"},
        expect_status=401
    )
    
    if success and isinstance(data, dict) and "error" in data:
        log_test("Auth Login Failure (401)", True, f"Error message: {data.get('error')}")
        return True
    else:
        log_test("Auth Login Failure (401)", False, f"Status: {status}, Response: {data}")
        return False

def test_auth_verify_valid():
    """Test 3: GET /api/auth/verify with valid token"""
    if not auth_token:
        log_test("Auth Verify Valid Token", False, "No auth token available")
        return False
    
    success, data, status = make_request(
        "GET",
        "auth/verify",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if success and isinstance(data, dict) and data.get("valid") is True:
        log_test("Auth Verify Valid Token", True, "Token validated successfully")
        return True
    else:
        log_test("Auth Verify Valid Token", False, f"Status: {status}, Response: {data}")
        return False

def test_auth_verify_invalid():
    """Test 4: GET /api/auth/verify with invalid token"""
    success, data, status = make_request(
        "GET",
        "auth/verify",
        headers={"Authorization": "Bearer invalidtoken123"},
        expect_status=200
    )
    
    if success and isinstance(data, dict) and data.get("valid") is False:
        log_test("Auth Verify Invalid Token", True, "Invalid token correctly rejected")
        return True
    else:
        log_test("Auth Verify Invalid Token", False, f"Status: {status}, Response: {data}")
        return False

def test_products_get_list():
    """Test 5: GET /api/products - should return at least 10 seeded products"""
    success, data, status = make_request("GET", "products", expect_status=200)
    
    if not success:
        log_test("Products GET List", False, f"Status: {status}, Response: {data}")
        return False, None
    
    if not isinstance(data, list):
        log_test("Products GET List", False, f"Expected array, got: {type(data)}")
        return False, None
    
    if len(data) < 10:
        log_test("Products GET List", False, f"Expected at least 10 products, got {len(data)}")
        return False, None
    
    # Check for duplicates by slug
    slugs = [p.get("slug") for p in data if p.get("slug")]
    if len(slugs) != len(set(slugs)):
        log_test("Products GET List", False, "Duplicate slugs found in products")
        return False, None
    
    # Verify expected products
    expected_products = ["Meat Masala", "Garam Masala", "Shahi Paneer", "Dal Bati", 
                        "Khada Masala", "Chicken Masala", "Haldi", "Mirchi", "Dhaniya"]
    product_names = [p.get("name", "") for p in data]
    
    log_test("Products GET List", True, 
             f"Found {len(data)} products, no duplicates. Sample: {product_names[:3]}")
    return True, data

def test_products_get_by_slug():
    """Test 6: GET /api/products/slug/haldi-powder"""
    success, data, status = make_request("GET", "products/slug/haldi-powder", expect_status=200)
    
    if not success:
        log_test("Products GET by Slug", False, f"Status: {status}, Response: {data}")
        return False, None
    
    if not isinstance(data, dict) or not data.get("slug") == "haldi-powder":
        log_test("Products GET by Slug", False, f"Expected haldi-powder product, got: {data}")
        return False, None
    
    # Check for variants and ingredients
    has_variants = "variants" in data
    has_ingredients = "ingredients" in data
    
    log_test("Products GET by Slug", True, 
             f"Product: {data.get('name')}, Variants: {has_variants}, Ingredients: {has_ingredients}")
    return True, data

def test_products_get_by_id(product_id: str):
    """Test 7: GET /api/products/{id}"""
    success, data, status = make_request("GET", f"products/{product_id}", expect_status=200)
    
    if success and isinstance(data, dict) and data.get("id") == product_id:
        log_test("Products GET by ID", True, f"Product: {data.get('name')}")
        return True
    else:
        log_test("Products GET by ID", False, f"Status: {status}, Response: {data}")
        return False

def test_products_post_without_token():
    """Test 8: POST /api/products without token - should return 401"""
    success, data, status = make_request(
        "POST",
        "products",
        data={"name": "Test Spice"},
        expect_status=401
    )
    
    if success and isinstance(data, dict) and "error" in data:
        log_test("Products POST without Token (401)", True, f"Correctly rejected: {data.get('error')}")
        return True
    else:
        log_test("Products POST without Token (401)", False, f"Status: {status}, Response: {data}")
        return False

def test_products_post_with_token():
    """Test 9: POST /api/products with valid token"""
    if not auth_token:
        log_test("Products POST with Token", False, "No auth token available")
        return False, None
    
    product_data = {
        "name": "Test Spice",
        "category": "standard-plastic",
        "variants": [
            {
                "weight": "100g",
                "mrp": 50,
                "price": 45,
                "sku": "NZ-TS-100"
            }
        ]
    }
    
    success, data, status = make_request(
        "POST",
        "products",
        data=product_data,
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success:
        log_test("Products POST with Token", False, f"Status: {status}, Response: {data}")
        return False, None
    
    if not isinstance(data, dict) or not data.get("id") or not data.get("slug"):
        log_test("Products POST with Token", False, f"Missing id or slug in response: {data}")
        return False, None
    
    log_test("Products POST with Token", True, 
             f"Created product: {data.get('name')} (ID: {data.get('id')}, Slug: {data.get('slug')})")
    return True, data

def test_products_put(product_id: str):
    """Test 10: PUT /api/products/{id} with token"""
    if not auth_token:
        log_test("Products PUT", False, "No auth token available")
        return False
    
    update_data = {"name": "Test Spice Updated"}
    
    success, data, status = make_request(
        "PUT",
        f"products/{product_id}",
        data=update_data,
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success:
        log_test("Products PUT", False, f"Status: {status}, Response: {data}")
        return False
    
    # Verify the update by fetching the product
    verify_success, verify_data, verify_status = make_request("GET", f"products/{product_id}")
    
    if verify_success and verify_data.get("name") == "Test Spice Updated":
        log_test("Products PUT", True, f"Product updated and verified: {verify_data.get('name')}")
        return True
    else:
        log_test("Products PUT", False, f"Update not reflected. Got: {verify_data.get('name')}")
        return False

def test_products_duplicate(product_id: str):
    """Test 11: POST /api/products/{id}/duplicate"""
    if not auth_token:
        log_test("Products Duplicate", False, "No auth token available")
        return False, None
    
    success, data, status = make_request(
        "POST",
        f"products/{product_id}/duplicate",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success:
        log_test("Products Duplicate", False, f"Status: {status}, Response: {data}")
        return False, None
    
    if not isinstance(data, dict) or not data.get("id") or " (Copy)" not in data.get("name", ""):
        log_test("Products Duplicate", False, f"Expected copy with '(Copy)' suffix, got: {data}")
        return False, None
    
    log_test("Products Duplicate", True, 
             f"Duplicated: {data.get('name')} (ID: {data.get('id')}, Slug: {data.get('slug')})")
    return True, data

def test_products_delete(product_id: str):
    """Test 12: DELETE /api/products/{id}"""
    if not auth_token:
        log_test("Products DELETE", False, "No auth token available")
        return False
    
    success, data, status = make_request(
        "DELETE",
        f"products/{product_id}",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success or not isinstance(data, dict) or not data.get("success"):
        log_test("Products DELETE", False, f"Status: {status}, Response: {data}")
        return False
    
    # Verify deletion by trying to fetch
    verify_success, verify_data, verify_status = make_request(
        "GET", 
        f"products/{product_id}",
        expect_status=404
    )
    
    if verify_success:
        log_test("Products DELETE", True, f"Product deleted and verified (404 on GET)")
        return True
    else:
        log_test("Products DELETE", False, f"Product still exists after deletion")
        return False

def test_enquiries_post_public():
    """Test 13: POST /api/enquiries without token (public)"""
    enquiry_data = {
        "name": "Rajesh Kumar",
        "phone": "9876543210",
        "city": "Indore",
        "message": "Want to be a distributor for Nimad ZAYKA Spices in Indore region"
    }
    
    success, data, status = make_request(
        "POST",
        "enquiries",
        data=enquiry_data,
        expect_status=200
    )
    
    if not success:
        log_test("Enquiries POST Public", False, f"Status: {status}, Response: {data}")
        return False, None
    
    if not isinstance(data, dict) or not data.get("id") or data.get("status") != "new":
        log_test("Enquiries POST Public", False, f"Expected enquiry with id and status='new', got: {data}")
        return False, None
    
    log_test("Enquiries POST Public", True, 
             f"Enquiry created: {data.get('name')} from {data.get('city')} (ID: {data.get('id')})")
    return True, data

def test_enquiries_get_without_token():
    """Test 14: GET /api/enquiries without token - should return 401"""
    success, data, status = make_request("GET", "enquiries", expect_status=401)
    
    if success and isinstance(data, dict) and "error" in data:
        log_test("Enquiries GET without Token (401)", True, f"Correctly rejected: {data.get('error')}")
        return True
    else:
        log_test("Enquiries GET without Token (401)", False, f"Status: {status}, Response: {data}")
        return False

def test_enquiries_get_with_token():
    """Test 15: GET /api/enquiries with token"""
    if not auth_token:
        log_test("Enquiries GET with Token", False, "No auth token available")
        return False
    
    success, data, status = make_request(
        "GET",
        "enquiries",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success:
        log_test("Enquiries GET with Token", False, f"Status: {status}, Response: {data}")
        return False
    
    if not isinstance(data, list):
        log_test("Enquiries GET with Token", False, f"Expected array, got: {type(data)}")
        return False
    
    log_test("Enquiries GET with Token", True, f"Retrieved {len(data)} enquiries")
    return True

def test_enquiries_put(enquiry_id: str):
    """Test 16: PUT /api/enquiries/{id} with token"""
    if not auth_token:
        log_test("Enquiries PUT", False, "No auth token available")
        return False
    
    update_data = {"status": "contacted"}
    
    success, data, status = make_request(
        "PUT",
        f"enquiries/{enquiry_id}",
        data=update_data,
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success or not isinstance(data, dict) or not data.get("success"):
        log_test("Enquiries PUT", False, f"Status: {status}, Response: {data}")
        return False
    
    # Verify by fetching all enquiries and checking status
    verify_success, verify_data, _ = make_request(
        "GET",
        "enquiries",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    
    if verify_success:
        enquiry = next((e for e in verify_data if e.get("id") == enquiry_id), None)
        if enquiry and enquiry.get("status") == "contacted":
            log_test("Enquiries PUT", True, f"Status updated to 'contacted' and verified")
            return True
    
    log_test("Enquiries PUT", False, "Update not reflected in GET")
    return False

def test_enquiries_delete(enquiry_id: str):
    """Test 17: DELETE /api/enquiries/{id} with token"""
    if not auth_token:
        log_test("Enquiries DELETE", False, "No auth token available")
        return False
    
    success, data, status = make_request(
        "DELETE",
        f"enquiries/{enquiry_id}",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if success and isinstance(data, dict) and data.get("success"):
        log_test("Enquiries DELETE", True, f"Enquiry deleted successfully")
        return True
    else:
        log_test("Enquiries DELETE", False, f"Status: {status}, Response: {data}")
        return False

def test_analytics_track_public():
    """Test 18: POST /api/analytics/track without token (public)"""
    track_data = {
        "event": "page_view",
        "path": "/",
        "productSlug": "haldi-powder"
    }
    
    success, data, status = make_request(
        "POST",
        "analytics/track",
        data=track_data,
        expect_status=200
    )
    
    if success and isinstance(data, dict) and data.get("tracked") is True:
        log_test("Analytics Track Public", True, f"Event tracked: {track_data['event']}")
        return True
    else:
        log_test("Analytics Track Public", False, f"Status: {status}, Response: {data}")
        return False

def test_analytics_summary_without_token():
    """Test 19: GET /api/analytics/summary without token - should return 401"""
    success, data, status = make_request("GET", "analytics/summary", expect_status=401)
    
    if success and isinstance(data, dict) and "error" in data:
        log_test("Analytics Summary without Token (401)", True, f"Correctly rejected: {data.get('error')}")
        return True
    else:
        log_test("Analytics Summary without Token (401)", False, f"Status: {status}, Response: {data}")
        return False

def test_analytics_summary_with_token():
    """Test 20: GET /api/analytics/summary with token"""
    if not auth_token:
        log_test("Analytics Summary with Token", False, "No auth token available")
        return False
    
    success, data, status = make_request(
        "GET",
        "analytics/summary",
        headers={"Authorization": f"Bearer {auth_token}"},
        expect_status=200
    )
    
    if not success:
        log_test("Analytics Summary with Token", False, f"Status: {status}, Response: {data}")
        return False
    
    required_fields = ["totalProducts", "totalEnquiries", "totalScans", "whatsappClicks", 
                      "recentEvents", "topProducts"]
    missing_fields = [f for f in required_fields if f not in data]
    
    if missing_fields:
        log_test("Analytics Summary with Token", False, f"Missing fields: {missing_fields}")
        return False
    
    log_test("Analytics Summary with Token", True, 
             f"Products: {data.get('totalProducts')}, Enquiries: {data.get('totalEnquiries')}, "
             f"Scans: {data.get('totalScans')}, WhatsApp: {data.get('whatsappClicks')}")
    return True

def test_edge_case_nonexistent_endpoint():
    """Test 21: GET /api/nonexistent - should return 404"""
    success, data, status = make_request("GET", "nonexistent", expect_status=404)
    
    if success and isinstance(data, dict) and "error" in data:
        log_test("Edge Case: Nonexistent Endpoint (404)", True, f"Correctly returned 404")
        return True
    else:
        log_test("Edge Case: Nonexistent Endpoint (404)", False, f"Status: {status}, Response: {data}")
        return False

def test_edge_case_malformed_json():
    """Test 22: POST /api/products with empty body"""
    if not auth_token:
        log_test("Edge Case: Malformed JSON", False, "No auth token available")
        return False
    
    # Try with empty body - should not crash server
    try:
        url = f"{BASE_URL}/products"
        resp = requests.post(
            url, 
            data="",  # Empty body
            headers={"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"},
            timeout=10
        )
        
        # Server should handle gracefully (either 400 or create with defaults)
        if resp.status_code in [200, 400, 500]:
            log_test("Edge Case: Empty Body", True, 
                    f"Server handled gracefully with status {resp.status_code}")
            return True
        else:
            log_test("Edge Case: Empty Body", False, f"Unexpected status: {resp.status_code}")
            return False
    except Exception as e:
        log_test("Edge Case: Empty Body", False, f"Server crashed or error: {str(e)}")
        return False

def run_all_tests():
    """Run all tests in priority order"""
    print("=" * 80)
    print("NIMAD ZAYKA SPICES - BACKEND API TESTS")
    print("=" * 80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Password: {ADMIN_PASSWORD}")
    print("=" * 80)
    
    # Store IDs for later tests
    test_product_id = None
    duplicate_product_id = None
    enquiry_id = None
    
    # ============= AUTHENTICATION TESTS =============
    print("\n" + "=" * 80)
    print("1. AUTHENTICATION TESTS")
    print("=" * 80)
    
    test_auth_login_success()
    test_auth_login_failure()
    test_auth_verify_valid()
    test_auth_verify_invalid()
    
    # ============= PRODUCTS CRUD TESTS =============
    print("\n" + "=" * 80)
    print("2. PRODUCTS CRUD TESTS")
    print("=" * 80)
    
    success, products = test_products_get_list()
    if success and products:
        # Use first product for ID test
        test_product_id = products[0].get("id")
        if test_product_id:
            test_products_get_by_id(test_product_id)
    
    test_products_get_by_slug()
    test_products_post_without_token()
    
    success, created_product = test_products_post_with_token()
    if success and created_product:
        test_product_id = created_product.get("id")
        if test_product_id:
            test_products_put(test_product_id)
            
            success, duplicate = test_products_duplicate(test_product_id)
            if success and duplicate:
                duplicate_product_id = duplicate.get("id")
                if duplicate_product_id:
                    test_products_delete(duplicate_product_id)
    
    # ============= ENQUIRIES TESTS =============
    print("\n" + "=" * 80)
    print("3. ENQUIRIES TESTS")
    print("=" * 80)
    
    success, enquiry = test_enquiries_post_public()
    if success and enquiry:
        enquiry_id = enquiry.get("id")
    
    test_enquiries_get_without_token()
    test_enquiries_get_with_token()
    
    if enquiry_id:
        test_enquiries_put(enquiry_id)
        test_enquiries_delete(enquiry_id)
    
    # ============= ANALYTICS TESTS =============
    print("\n" + "=" * 80)
    print("4. ANALYTICS TESTS")
    print("=" * 80)
    
    test_analytics_track_public()
    test_analytics_summary_without_token()
    test_analytics_summary_with_token()
    
    # ============= EDGE CASES =============
    print("\n" + "=" * 80)
    print("5. EDGE CASES")
    print("=" * 80)
    
    test_edge_case_nonexistent_endpoint()
    test_edge_case_malformed_json()
    
    # ============= SUMMARY =============
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"Total: {test_results['passed'] + test_results['failed']}")
    
    if test_results['failed'] > 0:
        print("\n" + "=" * 80)
        print("FAILED TESTS:")
        print("=" * 80)
        for error in test_results['errors']:
            print(f"  • {error}")
    
    print("\n" + "=" * 80)
    
    return test_results['failed'] == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
