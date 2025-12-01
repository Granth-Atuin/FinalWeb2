export default function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
            <div className="relative w-48 h-48">
                {/* PNJ de Error (Robot triste) */}
                <img
                    src="https://image.pollinations.ai/prompt/cute%20sad%20robot%20character%203d%20render%20dark%20background%204k?nologo=true"
                    alt="Error Robot"
                    className="w-full h-full object-contain drop-shadow-2xl animate-bounce-slow"
                />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">¡Ups! Algo salió mal</h2>
                <p className="text-gray-400 max-w-md mx-auto">{message || "No pudimos cargar los productos. Por favor, intenta nuevamente."}</p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/20"
                >
                    Reintentar
                </button>
            )}
        </div>
    )
}
