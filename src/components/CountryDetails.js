import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryDetails = () => {
    const { name } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name.toLowerCase()}`)
            .then(res => setDetails(res.data))
            .catch(err => console.log(err.message));
    });

    return (
        <div className="details">
            {
                details.map(detail => {
                    return (
                        <div
                            key={detail.name.common}
                            className="detail"
                        >
                            <h2>{detail.name.official}</h2>
                            <p>
                                <img
                                    src={detail.flags.png}
                                    alt={detail.name.official}
                                />
                            </p>
                            <p>Capital: {detail.capital}</p>
                            <p>Region: {detail.region}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default CountryDetails;