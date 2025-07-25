import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

export default function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="Add your first countries by clicking on a countries on the map" />
    );
  const countries = cities.reduce((acc, cur) => {
    if (!acc.includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    } else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
