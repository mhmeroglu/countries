import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [countries, setCountries] = useState([]);
    const [countryMatch, setCountryMatch] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(res => setCountries(res.data.sort((a, b) => {
                if (a.name.common > b.name.common) return 1;
                if (a.name.common < b.name.common) return -1;
                return 0;
            })))
            .catch(err => console.log(err.message));
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (!e.target.value) {
            setCountryMatch([]);
        }
        else {
            let matches = countries.filter(country => {

                const regex = new RegExp(`${e.target.value}`, "gi");

                return country.name.common.match(regex);
            });
            setCountryMatch(matches);
        }
    }

    const handelKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/country-details/${search}`);
        }
    }

    const handleClick = (data) => {
        setSearch(data);
    };

    return (
        <div className="navbar">
            <Link to="/">
                <h1>Countries App</h1>
            </Link>
            <div className="links">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    onKeyDown={handelKeyDown}
                    value={search}
                />
                <div
                    className="suggestion"
                >
                    {
                        countryMatch && countryMatch.map((item, index) => (

                            <p
                                className="suggestion-list"
                                key={index}
                                onClick={() => handleClick(item.name.common)}
                            >
                                {item.name.common}
                            </p>

                        ))
                    }
                </div>
                <Link to={`/country-details/${search}`}><button>Search</button></Link>
            </div>
        </div>
    );
}

export default Navbar;