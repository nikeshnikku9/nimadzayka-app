export async function POST(req) {

  try {

    const body = await req.json();

    const password = body.password;

    if (password === 'NIMADZAYKA09') {

      return Response.json({
        token: 'nimad-zayka-admin-token'
      });

    }

    return Response.json(
      {
        error: 'Invalid password'
      },
      {
        status: 401
      }
    );

  } catch {

    return Response.json(
      {
        error: 'Server error'
      },
      {
        status: 500
      }
    );

  }
}
