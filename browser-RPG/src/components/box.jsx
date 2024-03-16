import { useEffect, useState } from 'react'
import './box.css'
import Modal from 'react-modal';

let fighting;
let inventory = ["stick"];
// Right now the bug is happening because monsterHealth is NAN.
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    img: "openart-image_vGzNhgmG_1709936915516_raw.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60,
    img: "fangedBeast.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "Mad Engineer",
    level: 20,
    health: 300,
    img: "Mad Engineer.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "Baby Dragon",
    level: 50,
    health: 2000,
    img: "babydrag.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  },
  {
    name: "Final Momma Dragon",
    level: 250,
    health: 10000,
    img: "adultdrag.jpg",
    desc: "A cute, yet feisty slime prepared to fight anyone in his way."
  }
]

const weaponsList = [
  { name: 'stick', power: 5, cost: 0, index: 0, img: "stick.jpg"},
  { name: 'dagger', power: 10, cost: 50, index: 1, img: "daggers.jpg"},
  { name: 'claw hammer', power: 25, cost: 250, index: 2, img: "hammer.jpg"},
  { name: 'sword', power: 50, cost: 500, index: 3, img: "sword.jpg"}
];

const consumableList = [
  {name: "10 Health", health: 10, cost: 10},
  {name: "25 Health", health: 25, cost: 25},
  {name: "50 Health", health: 50, cost: 50},
  {name: "100 Health", health: 100, cost: 100},
]

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



  function buyHealth(consumable) {
    if (gold >= consumable.cost) {
      setGold(gold - consumable.cost);
      setHealth(health + consumable.health);
    } else {
      alert("Sorry you don't have enough gold.")
    }
  }
  
  function attack() {
    setHealth(health - getMonsterAttackValue(selectedMonster.level));
    //Health is increasing as xp goes up for some reason.
    setMonsterHealth(monsterHealth - (weaponsList[currentWeapon].power + Math.floor(Math.random() * xp)) + 1);
}

  function defeat() {
    alert("You have died. Restarting game.")
    setHealth(100)
    setGold(50)
    setXp(0)
    setCurrentWeapon(0)
  }
useEffect(() => {
  if (parseInt(monsterHealth) <= 0) {
    defeatMonster();
    closeFightModal()
    setMonsterHealth(1)
  }
  if (health <= 0) {
    defeat()
    closeFightModal()
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
      <div className='monster' onClick={openShopModal}>
      <img className="monsterimg"src={"shop.jpg"}/>
      <h1>Shop</h1>
      </div>
        {monsterList}
      </div>
    </>
  )
}

function Weapons() {
  const weaponsful = weaponsList.map((weapon) => {
    return (
      <div className='monster' onClick={() => buyWeapon(weapon)} key={weapon.index}>
        <img className="monsterimg"src={weapon.img}/>
        <h1>{weapon.name}</h1>
        <h3 className='level'>Power: {weapon.power}</h3>
        <h3>Cost: {weapon.cost}</h3>
        <h3>Current max hit with weapon: {weapon.power + xp + 1}</h3>
      </div>
    );
  });

  const consumablesful = consumableList.map((consumable) => {
    return (
      <div className='monster' onClick={() => buyHealth(consumable)} key={consumable.name}>
      <img className="monsterimg"src={"health.jpg"}/>
        <h1>{consumable.name}</h1>
        <h3>Health: +{consumable.health}</h3>
        <h3>Cost: {consumable.cost}</h3>
      </div>
    );
  });

  return (
    <>
      <div className='mobs'>
        {weaponsful}
        {consumablesful}
        <div className='monster' onClick={closeShopModal}>
        <img className="monsterimg"src={"cave.jpg"}/>
        <h1>Return</h1>
      </div>
      </div>
      {/* <div className='consumables'>
        <h2>Consumables</h2>
      </div> */}
    </>
  );
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
      backgroundColor: '#344955', // Set your desired background color here
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
      <div className="box">
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          <span>{gold}</span>
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
        <h1>Enemy Health: {monsterHealth}</h1>
        <h1>Your XP: {xp}</h1>

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
        <div className='coins'>
          <img src='Coin.png' className='coins' alt='coins'/>
          {gold}
          <span>Health: {health}</span>
        </div>
        <Weapons/>
      </Modal>
    </>
  );
}

export default Box;