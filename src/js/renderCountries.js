import fetchCountries from './fetchCountries';
import cardTemplate from '../templates/card.hbs';
import listTemplate from '../templates/countriesList.hbs';

import {alert, error, notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const responceThumbEl = document.querySelector('.responce-thumb')
const searchInput = document.querySelector('#serchInput')



searchInput.addEventListener('input', debounce(onInputChange, 500) )
function onInputChange(event){
    const searchQuery = event.target.value
    
    if(searchQuery.length > 0){
        fetchCountries(searchQuery)
        .then(countries =>{
            if(countries.length > 10){
                notice('Too many matches found. Please, enter more specific query!')
            }
            else if(countries.length >= 2 & countries.length <= 10){
                renderCountriesList(countries)
            }
            else{
                renderCountry(countries) 
            }
           
        })
        .catch(onFetchError)
        
    }

}


function renderCountry(country){
    responceThumbEl.innerHTML = cardTemplate(country);   
}

function renderCountriesList(list){
    responceThumbEl.innerHTML = listTemplate(list);
}

function onFetchError(err){
    error( `ERROR: ${err}`);
}
