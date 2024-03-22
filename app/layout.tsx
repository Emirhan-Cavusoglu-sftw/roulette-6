import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basic Frame Example",
  description: "Createid for frameworks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
