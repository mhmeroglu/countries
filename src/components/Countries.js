import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Countries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(res => setCountries(res.data.sort((a, b) => {
                if (a.name.common > b.name.common) return 1;
                if (a.name.common < b.name.common) return -1;
                return 0;
            })))
            .catch(err => console.log(err.message));
    }, []);

    return (
        <div className="countries">
            {
                countries.map(country => {
                    return (
                        <div
                            key={country.name.common}
                            className="list"
                        >
                            <Link to={`/country-details/${country.name.common}`}>

                                <img
                                    src={country.flags.png}
                                    alt={country.name.common}
                                />

                                <p>{country.name.common}</p>
                            </Link>

                        </div>
                    );
                })
            }

        </div>
    );
}

export default Countries;