import { useEffect, useState } from 'react'
import './box.css'
import Modal from 'react-modal';

let fighting;
let inventory = ["stick"];
// Right now the bug is happening because monsterHealth is NAN.
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

const weaponsList = [
  { name: 'stick', power: 5, cost: 0, index: 0},
  { name: 'dagger', power: 10, cost: 50, index: 1},
  { name: 'claw hammer', power: 25, cost: 250, index: 2},
  { name: 'sword', power: 50, cost: 500, index: 3}
];

function Box() {
  const [modalFightIsOpen, setFightModalIsOpen] = useState(false);
  const [modalShopIsOpen, setShopModalIsOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(true);
  let [health, setHealth] = useState(100);
  let [gold, setGold] = useState(50);
  let [monsterHealth, setMonsterHealth] = useState(5);
  let [xp, setXp] = useState(0);
  let [currentWeapon, setCurrentWeapon] = useState(0);
  let [weaponName, setWeaponName] = useState("Stick");



  function buyHealth() {
    if (gold >= 10) {
      setGold(gold - 10);
      setHealth(health + 10);
    } else {
      alert("Sorry you don't have enough gold.")
    }
  }
  
  function attack() {
    setHealth(health - getMonsterAttackValue(selectedMonster.level));
    //Health is increasing as xp goes up for some reason.
    setMonsterHealth(monsterHealth - (weaponsList[currentWeapon].power + Math.floor(Math.random() * xp)) + 1);
}

useEffect(() => {
  if (parseInt(monsterHealth) <= 0) {
    defeatMonster();
    closeFightModal()
    setMonsterHealth(1)
  }
})

const buyWeapon = (weapon) => {
  if (gold >= weapon.cost) {
    setCurrentWeapon(weapon.index)
    setWeaponName(weapon.name)
    setGold(gold - weapon.cost)
  } else {
    alert("You do not have enough gold.")
  }
}

function defeatMonster() {
  setGold(gold += Math.floor(selectedMonster.level * 6.7));
  setXp(xp + selectedMonster.level);
  return
}

function getMonsterAttackValue() {
  const hit = (selectedMonster.level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
function monstHealth(monster) {
  setMonsterHealth(monster.health)
}

function Cave() {
  const monsterList = monsters.map((monster) => {
    return  <div className='monster' onClick={() => openFightModal(monster)}>
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

function Weapons() {
  const weaponsful = weaponsList.map((weapon) => {
    return  <div className='monster'  onClick={() => buyWeapon(weapon)}>
              <h1>{weapon.name}</h1>
              <h3 className='level'>Power: {weapon.power}</h3>
              <h3>Cost: {weapon.cost}</h3>
              <h3>Current max hit with weapon: {weapon.power + xp + 1}</h3>
            </div> 
  })
  return (
    <>
      <div className='mobs'>
        {weaponsful}
      </div>
    </>
  )
}
  //Shop modal open/close
  const openShopModal = () => {
    setShopModalIsOpen(true);
  };

  const closeShopModal = () => {
    setShopModalIsOpen(false);
  };
  const modalStyles = {
    content: {
      backgroundColor: '#50727B', // Set your desired background color here
    },
  };
  //Fight modal open and close
  const openFightModal = (monster) => {
    setSelectedMonster(monster); // Store the selected monster in the state
    monstHealth(monster)
    setFightModalIsOpen(true);
  };

  const closeFightModal = () => {
    setFightModalIsOpen(false);
  };
  return (
    <>
      <button onClick={openShopModal}>Shop</button>
      <div className="box">
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <Cave/>
      {/* Modal for the Fighting */}
      </div>
      <Modal
        isOpen={modalFightIsOpen}
        onRequestClose={closeFightModal}
        contentLabel="Fight Modal"
        style={modalStyles} // Apply the custom 
      >  
        {<h1>Fight!</h1>}
        <h1>{selectedMonster.name}</h1>
        <h1>Health: {monsterHealth}</h1>
        <h1>xp: {xp}</h1>

        <button onClick={attack}>Attack</button>
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <button onClick={closeFightModal}>Close Fight</button>
      </Modal>

      {/* Modal for the shop */}
      <Modal
        isOpen={modalShopIsOpen}
        onRequestClose={closeShopModal}
        contentLabel="Shop Modal"
        style={modalStyles} // Apply the custom styles
      >
        {<h1>Shop!</h1>}
        <h1>Current Weapon: {weaponName}</h1>
        <Weapons/>
        <button onClick={buyHealth}>Buy health</button>
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <button onClick={closeShopModal}>Close Shop</button>
      </Modal>
    </>
  );
}

export default Box;