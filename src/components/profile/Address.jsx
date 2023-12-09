import { auth, store } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import AddressCard from "./AddressCard";
import classes from "./Address.module.css";
import Loading from "./Loading";

export default function Address() {
  const user = auth.currentUser;
  const [addresses, setAddresses] = useState([]);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  const addressline1 = useRef();
  const addressline2 = useRef();
  const city = useRef();
  const county = useRef();
  const postalcode = useRef();

  useEffect(() => {
    getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user.email))
    ).then((data) => {
      const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setAddresses(result[0].addresses);
      console.log(result[0].addresses);
      setLoading(false);
    });
  }, [user.email, addresses.length]);

  async function addAddress() {
    const dataobject = {
      addressline1: addressline1.current.value,
      addressline2: addressline2.current.value,
      city: city.current.value,
      county: county.current.value,
      postalcode: postalcode.current.value,
    };
    await getDocs(
      query(collection(store, "usersdetails"), where("email", "==", user.email))
    ).then(async (data) => {
      const result = data.docs.map((docc) => ({
        ...docc.data(),
        id: docc.id,
      }));
      const addressRef = doc(store, "usersdetails", result[0].id);
      await updateDoc(addressRef, { addresses: arrayUnion(dataobject) })
        .then(() => {
          setAlert("address added.");
          setTimeout(() => {
            window.location.reload(), 1000;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <div className={classes.container}>
      <br />
      <h1>Address</h1>
      <br />
      <p>You have {addresses.length} address setted</p>
      <br />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.address}>
          {addresses.map((address) => (
            <AddressCard
              key={address}
              addressline1={address.addressline1}
              addressline2={address.addressline2}
              county={address.county}
              city={address.city}
              code={address.postalcode}
            />
          ))}
        </div>
      )}

      <br />
      <h3>Add a New Address</h3>
      <br />
      <form onSubmit={addAddress} className={classes.form}>
        <label htmlFor="addressline1">Address Line 1</label>
        <input
          type="text"
          size={70}
          id="addressline1"
          required
          ref={addressline1}
        />
        <br />
        <label htmlFor="addressline2">Address Line 2</label>
        <input type="text" size={70} id="addressline2" ref={addressline2} />
        <br />
        <label htmlFor="city">City</label>
        <input type="text" size={40} id="city" required ref={city} />
        <br />
        <label htmlFor="county">County(Optional)</label>
        <input type="text" size={40} id="county" ref={county} />
        <br />
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          size={40}
          id="postalcode"
          required
          ref={postalcode}
        />
        <br />
        <button>Submit</button>
        <p>{alert}</p>
      </form>
    </div>
  );
}
