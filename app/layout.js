export const metadata = {
  title: 'サービス変更報告 作成アプリ',
  description: 'Gemini APIを使用したサービス変更報告作成ツール',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}
