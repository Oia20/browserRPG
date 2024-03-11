import { useState } from 'react'
import './box.css'
import Modal from 'react-modal';

let xp = 0;
let currentWeapon = 0;
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

const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

// function Cave() {
//   const monsterList = monsters.map((monster) => {
//     return  <div className='monster'>
//               <img className="monsterimg"src={monster.img}/>
//               <h1>{monster.name}</h1>
//               <h3 className='level'>Level: {monster.level}</h3>
//               <h3 className='level'>Health: {monster.health}</h3>
//               {/* <span>{monster.desc}</span> */}
//             </div> 
//   })
//   return (
//     <>
//       <div className='mobs'>
//         {monsterList}
//       </div>
//     </>
//   )
// }

function Box() {
  const [modalFightIsOpen, setFightModalIsOpen] = useState(false);
  const [modalShopIsOpen, setShopModalIsOpen] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState(true);
  let [health, setHealth] = useState(100);
  let [gold, setGold] = useState(50);
  let [monsterHealth, setMonsterHealth] = useState(5);
  function buyHealth() {
    if (gold >= 10) {
      setGold(gold - 10);
      setHealth(health + 10);
    } else {
      alert("Sorry you don't have enough gold.")
    }
  }
  
  function attack() {
    // fighting = selectedMonster
    setHealth(health - getMonsterAttackValue(selectedMonster.level));
    setMonsterHealth(monsterHealth - weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1);    
    // } else {
    //   text.innerText += " You miss.";
    // }
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
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
        {/* problem is here!!!!!!!!!!!!!!!!!!!! */}
        <h1>{selectedMonster.name}</h1>
        <h1>Health: {monsterHealth}</h1>

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
        <button>Buy weapon</button>
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