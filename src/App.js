import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";




export default class App extends Component {
  state = {
    contacts: contacts.slice(0,5)
  }
    
  addRandom = () => {
      const stateContactsId = this.state.contacts.map((contact) => contact.id);
      console.log(stateContactsId)
      const restOftheContacts = contacts.filter(contact => !stateContactsId.includes(contact.id));
      const randomContact = restOftheContacts[Math.floor(Math.random()*restOftheContacts.length)];
      const newContacts = this.state.contacts.concat(randomContact);
      this.setState((state, props) => ({
        contacts: newContacts
      }))  
  }

  sortByName = () => {
    const sortedContacts = this.state.contacts.sort((a,b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    this.setState((state,props)=> ({
      contacts: sortedContacts
    }))
  }

  sortByPopularity = () => {
    const sortedContacts = this.state.contacts.sort((a,b) => {
      if (b.popularity < a.popularity) return -1
      if (b.popularity > a.popularity) return 1
      return 0
    })
    this.setState((state,props)=> ({
      contacts: sortedContacts
    }))
  }

  delete = id => {
    const contactCopy = this.state.contacts;
       const contactId = contactCopy.findIndex(contact => contact.id === id); 
       contactCopy.splice(contactId, 1)
       this.setState({
         contacts: contactCopy
    })
    
  }

  render() {
    console.log(this.state.contacts)
      return (
      <div>
        <h1>IronContacts</h1>
        <button onClick={this.addRandom}> Add Random Contact</button>
        <button onClick={this.sortByName}> Sort by Name</button>
        <button onClick={this.sortByPopularity}> Sort by Popularity</button>
        <table>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Action</th>

          {this.state.contacts.map(item => (
            <tr key={item.id}> 
               <img style={{width:'80px'}}src={item.pictureUrl}/>
               <td>{item.name}</td>
               <td>{item.popularity.toFixed(2)}</td>
               <th><button onClick={() => this.delete(item.id)}>Delete</button></th>
            </tr>        
          ))}      
        </table>
      
        
      </div>
    )
  }
}







