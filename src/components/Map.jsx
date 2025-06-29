import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParms, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
      <h1>
        lat: {lat}, lng: {lng}
      </h1>
    </div>
  );
}
