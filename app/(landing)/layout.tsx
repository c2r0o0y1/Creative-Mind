const LandingLayout = ({ children }:
    {
        children: React.ReactNode
    }) => {
    return (
        <main className="h-full bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r overflow-auto">
            <div className="mx-auto max-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLayout
