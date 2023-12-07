import { Link } from "react-router-dom";


export const Header = () => {

return (
    <nav>
        <ul className="flex justify-between text-xl">
            <Link className="hover:bg-yellow-400 hover:text-black p-2"to="/"><li className="">Home</li></Link>
            <Link className="hover:bg-yellow-400 hover:text-black p-2" to="/PokemonList"><li>pokedex</li></Link>
            <Link className="hover:bg-yellow-400 hover:text-black p-2" to="/Fight"><li>fight</li></Link>
            <Link className="hover:bg-yellow-400 hover:text-black p-2" to="/LeaderBoard"><li>leaderboard</li></Link>
        </ul>

    </nav>
)

}