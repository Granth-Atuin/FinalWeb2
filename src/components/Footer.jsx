export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-800 bg-black w-full">
            <div className="w-full px-6 py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} JP Store. All rights reserved.
            </div>
        </footer>
    )
}