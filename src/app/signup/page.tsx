// src\app\signup\page.tsx
'use client'

export default function SignUpPage() {
    const handleFacebookLogin = async () => {
        window.location.href = 'http://localhost:5000/redirect/auth/signup';
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <h1 className="text-3xl font-bold mb-6">Sign Up to Meta CRO Tool</h1>
            <p className="text-gray-600 mb-8">Connect your Facebook page to get started.</p>

            <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleFacebookLogin}
        >
            Contitue with Facebook
        </button>
        </div>
    );

}