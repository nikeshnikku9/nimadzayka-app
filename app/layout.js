import "./globals.css";

export const metadata = {
  title: "Nimad ZAYKA",
  description: "Premium Indian Spices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
