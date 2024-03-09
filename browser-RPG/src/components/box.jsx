import { useState } from 'react'
import './box.css'
import Modal from 'react-modal';

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    img: "openart-image_vGzNhgmG_1709936915516_raw.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    img: "fangedBeast.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "mad engineer",
    level: 20,
    health: 300,
    img: "Mad Engineer.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  }
]

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function Cave() {
  const monsterList = monsters.map((monster) => {
    return  <div className='monster'>
              <img className="monsterimg"src={monster.img}/>
              <h1>{monster.name}</h1>
              <h3 className='level'>Level: {monster.level}</h3>
              <h3 className='level'>Health: {monster.health}</h3>
              {/* <span>{monster.desc}</span> */}
            </div>
  })
  
  return (
    <>
      <div className='mobs'>
        {monsterList}
      </div>
    </>
  )
}

function Box() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const modalStyles = {
    content: {
      backgroundColor: '#50727B', // Set your desired background color here
    },
  };
  return (
    <>
      <button onClick={openModal}>Shop</button>
      <div className="box">
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <Cave/>
      </div>

      {/* Modal for the shop */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Shop Modal"
        style={modalStyles} // Apply the custom styles
      >
        {<h1>Shop!</h1>}
        <button>Buy weapon</button>
        <button onClick={buyHealth}>Buy health</button>
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <button onClick={closeModal}>Close Shop</button>
      </Modal>
    </>
  );
}

export default Box;