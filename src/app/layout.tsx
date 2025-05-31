export const metadata = {
  title: "Diagnosys",
  icons: {
    icon: "/plus.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif" }}>{children}</body>
      </html>
    )
  }  