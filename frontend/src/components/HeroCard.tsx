const HeroCard = () => {
    return (
        <div className="mt-16 w-full flex justify-center items-center px-5 pb-10">
            <div className="relative w-full max-w-6xl group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-linear-to-r from-[#14CF93] via-emerald-400 to-[#14CF93] opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>

                {/* Main Frame */}
                <div className="relative rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-neutral-800 shadow-2xl overflow-hidden">
                    {/* Top Bar (like window UI) */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-[#0d0d0d]">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <p className="ml-3 text-xs text-neutral-500">Filezy</p>
                    </div>

                    {/* Image */}
                    <div className="relative overflow-hidden">
                        <img
                            src="./file-server.png"
                            alt="file-server"
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        {/* Subtle overlay gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
