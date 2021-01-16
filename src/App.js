import React, {useEffect, useState} from 'react';
import {firebaseInit} from "./services/firebase";
import "firebase/storage";
import './App.css';

import Header from "./components/Header";
import Auth from "./containers/Auth";
import Catalog from "./containers/Catalog";


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {setUser} from "./containers/Auth/actons";
import Account from "./containers/Account";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'
import CategoryPage from "./containers/CategoryPage";
import ProductPage from "./containers/ProductPage";

const App = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const storage = firebase.storage();



    const changeName = (e) => {
        setName(e.target.value);
    }

    const changeDescr = (e) => {
        setDescr(e.target.value);
    }

    const changePrice = (e) => {
        setPrice(e.target.value);
    }
    const changeImage = (e) => {
        // console.log(file);
        // console.log(e.target.files[0])
        if (e.target.files[0]) {
            const img = e.target.files[0];
            setImage(img);
        }
        // if (e.target.files[0]) {
        //     const img = e.target.files[0];
        // }

    }

    const submit = () => {
        let record = {
            name,
            description: descr,
            price,
            image,
            likes: 0,
            dislikes: 0,
            comments: '',
            favourites: ''
        }

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
        // {console.log(image)}
        // firebase.database().ref('macs').push(record);
    }


    const logOut = (e) => {
      e.preventDefault();
      dispatch(setUser(null));
        firebase.auth().signOut();
    }


  return (
    <div className="StoreApp">
      <Router>
          <Header logOut={logOut} />
          <Switch>
              <Route path="/login">
                  <Auth />
              </Route>
              <Route path="/account">
                  <Account />
              </Route>
              <Route path="/:category/:product">
                  <ProductPage />
              </Route>
              <Route path="/:category">
                  <CategoryPage />
              </Route>

              <Route path="/">
                  <Catalog />
              </Route>
          </Switch>
      </Router>

        {console.log(url)}
        <label htmlFor="">Название<input onChange={changeName} value={name} type="text"/></label>
        <label htmlFor="">Описание<textarea onChange={changeDescr} value={descr} type="text"/></label>
        <label htmlFor="">Цена<input onChange={changePrice} value={price} type="text"/></label>
        <label htmlFor="">Изображение<input onChange={changeImage} type="file"/></label>
        <button onClick={submit}>Добавить</button>



    </div>
  );
}

export default App;
