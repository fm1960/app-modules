// Placeholder — install module-auth to replace this page
// See: fm1960/app-modules/modules/auth/

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 text-center max-w-sm w-full">
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {process.env.NEXT_PUBLIC_APP_TAGLINE}
        </p>
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-700">
          Module <strong>auth</strong> non installé.
          <br />
          Copiez <code className="bg-amber-100 px-1 rounded">modules/auth/</code> dans cette app.
        </div>
      </div>
    </div>
  )
}
