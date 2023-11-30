import { Link } from "react-router-dom";


export const Header = () => {

return (
    <nav>
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/PokemonList"><li>pokedex</li></Link>
            <Link to="/Fight"><li>fight</li></Link>
            <Link to="/LeaderBoard"><li>leaderboard</li></Link>
        </ul>

    </nav>
)

}