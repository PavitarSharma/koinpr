import { Country, State, City }  from 'country-state-city';
import { useState } from 'react';




const useCounterStateCity = () => {
    const countries = Country.getAllCountries().map((country) => ({
        value: country.name,
        label: country.name,
        isoCode: country.isoCode
    }))
    
  return  {
    countries
  }
}

export default useCounterStateCity