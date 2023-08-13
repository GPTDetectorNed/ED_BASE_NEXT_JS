import Head from 'next/head';
import styles from '../pages/index.module.css';
import Script from 'next/script'

import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getDatabase, set, ref, update, onValue, get } from "firebase/database";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser } from "firebase/auth";

  setTimeout(() => {
   
  // Import the functions you need from the SDKs you need
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  function disableScroll() {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
  }
disableScroll()
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app)
  const auth = getAuth();
  document.getElementById('login-btn').addEventListener('click',()=>{
    const mail = document.getElementById('inp-mail').value
    const password = document.getElementById('inp-pass').value
    signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            document.getElementById('logindiv').style.display = 'none'
        })
        function enableScroll() {
            // Enable scrolling
            document.body.style.overflow = 'auto';
          }
          enableScroll()
        const topnumber = []
        const top = []
        const dataRe = ref(db, 'languages');
        get(dataRe).then((snapshot) => {
        const arrayChildre = Object.keys(snapshot.val());
            const childre  = snapshot.val();
           for (let i = 0; i < arrayChildre.length; i++) {
            const element = arrayChildre[i]
            console.log(element);
            top.push(element)
            console.log(childre[element].Vote)
            topnumber.push(childre[element].Vote)
            console.log(top);
            console.log(topnumber);
            
           }
           function combineArraysIntoObject(keysArray, valuesArray) {
            if (keysArray.length !== valuesArray.length) {
                throw new Error("Arrays must have the same length");
            }
      
            const combinedObject = keysArray.reduce((acc, key, index) => {
                acc[key] = valuesArray[index];
                return acc;
            }, {});
      
            return combinedObject;
            }
            const combinedObj = combineArraysIntoObject(topnumber, top);
            console.log(combinedObj);
            const extractedValues = Object.values(combinedObj);
            console.log(extractedValues[extractedValues.length-1]);
            document.getElementById('popular-lang').innerHTML = 'Most popular language: ' + extractedValues[extractedValues.length-1] + ' with ' + childre[extractedValues[extractedValues.length-1]].Vote + ' votes'
            
      
        })
        
        //Language
        document.getElementById('language-btn').addEventListener('click',()=>{
            if (document.getElementById('language-btn').style.cursor == 'default') {
                console.log('nothing');
            }
            else{
                document.getElementById('language-btn').style.background = '#e9e9e988'
                document.getElementById('language-btn').style.cursor = 'default'
                const lang = document.getElementById('select-lang').value
            const dataRe = ref(db, 'languages');
        get(dataRe).then((snapshot) => {
            
            const arrayChildren = Object.keys(snapshot.val());
            const children  = snapshot.val();
            const votesbefore = children[lang].Vote
            const newvotes =  votesbefore+1
            update(
                ref(db, 'languages/'+lang),{
                
                Vote: newvotes,
      
        }
        )
      
      
        
        
        })
            }
           
      
        })
      
      
      
        //Top
        const top3 = []
        const top3number = []
        const dataRef = ref(db, 'Functionalities');
        get(dataRef).then((snapshot) => {
            const arrayChildren = Object.keys(snapshot.val());
            const children  = snapshot.val();
           for (let i = 0; i < arrayChildren.length; i++) {
            const element = arrayChildren[i]
            console.log(element);
            top3.push(element)
            console.log(children[element].Vote)
            top3number.push(children[element].Vote)
            console.log(top3);
            console.log(top3number);
            
           }
           function combineArraysIntoObject(keysArray, valuesArray) {
      if (keysArray.length !== valuesArray.length) {
      throw new Error("Arrays must have the same length");
      }
      
      const combinedObject = keysArray.reduce((acc, key, index) => {
      acc[key] = valuesArray[index];
      return acc;
      }, {});
      
      return combinedObject;
      }
            const combinedObj = combineArraysIntoObject(top3number, top3);
            console.log(combinedObj);
            
            const extractedValues = Object.values(combinedObj);
            console.log(extractedValues);
          const newArray = extractedValues.reverse()
            for (let l = 0; l < newArray.length; l++) {
                const element = newArray[l];
                console.log(children[element]);
      
                if (l == 2) {
                    document.getElementById('third-top-name').innerHTML = children[element].Name
                    document.getElementById('third-top-expl').innerHTML = children[element].Expl
                    document.getElementById('third-top-vote').innerHTML = children[element].Vote
                }
                else if(l == 1){
                    document.getElementById('second-top-name').innerHTML = children[element].Name
                    document.getElementById('second-top-expl').innerHTML = children[element].Expl
                    document.getElementById('second-top-vote').innerHTML = children[element].Vote
                }
                else if(l == 0){
                    document.getElementById('first-top-name').innerHTML = children[element].Name
                    document.getElementById('first-top-expl').innerHTML = children[element].Expl
                    document.getElementById('first-top-vote').innerHTML = children[element].Vote
                }
            }
            document.getElementById('vote-btn-top-third').addEventListener('click',()=>{
                if (document.getElementById('vote-btn-top-third').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('vote-btn-top-third').style.color = 'gray'
                    document.getElementById('vote-btn-top-third').style.cursor = 'default'
                    const element = extractedValues[0];
                console.log(element);
               
                const vote = children[element].Vote
                const newvote = vote+1
                update(
                ref(db, 'Functionalities/'+element),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
      
            document.getElementById('vote-btn-top-second').addEventListener('click',()=>{
                if (document.getElementById('vote-btn-top-second').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('vote-btn-top-second').style.color = 'gray'
                    document.getElementById('vote-btn-top-second').style.cursor = 'default'
                    const element = extractedValues[1];
                console.log(element);
               
                const vote = children[element].Vote
                const newvote = vote+1
                update(
                ref(db, 'Functionalities/'+element),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
            document.getElementById('vote-btn-top-first').addEventListener('click',()=>{
                if (document.getElementById('vote-btn-top-first').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('vote-btn-top-first').style.color = 'gray'
                    document.getElementById('vote-btn-top-first').style.cursor = 'default'
                    const element = extractedValues[2];
                console.log(element);
               
                const vote = children[element].Vote
                const newvote = vote+1
                update(
                ref(db, 'Functionalities/'+element),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
            
        })
        
      
      
      
        //Random
        
        get(dataRef).then((snapshot) => {
      const arrayChildren = Object.keys(snapshot.val());
      const children = snapshot.val();
      const number =    Math.floor(Math.random() * ((arrayChildren.length-1)-0 +1)+0) 
      const element = arrayChildren[number]
      console.log(arrayChildren.length); 
      
      console.log(children[element].Name);
      const name = children[element].Name
      const expl = children[element].Expl
      const vote = children[element].Vote
      
            document.getElementById('name-rand-first').innerHTML = name
            document.getElementById('expl-rand-first').innerHTML = expl
            document.getElementById('vote-rand-first').innerHTML = vote + ' votes'
        
            document.getElementById('rand-vote-first').addEventListener('click', ()=>{
                if (document.getElementById('rand-vote-first').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('rand-vote-first').style.color = 'gray'
                document.getElementById('rand-vote-first').style.cursor = 'default'
                const newvote = vote + 1
                update(
                ref(db, 'Functionalities/'+name),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
      
      const number1 =    Math.abs(number-2) 
      const element1 = arrayChildren[number1]
      const name1 = children[element1].Name
      const expl1 = children[element1].Expl
      const vote1 = children[element1].Vote
      document.getElementById('name-rand-second').innerHTML = name1
            document.getElementById('expl-rand-second').innerHTML = expl1
            document.getElementById('vote-rand-second').innerHTML = vote1 + ' votes'
      
      
            document.getElementById('rand-vote-second').addEventListener('click', ()=>{
                if (document.getElementById('rand-vote-second').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('rand-vote-second').style.color = 'gray'
                document.getElementById('rand-vote-second').style.cursor = 'default'
                    const newvote = vote1 + 1
                update(
                ref(db, 'Functionalities/'+name1),{
                
                Vote: newvote,
      
        }
        )
                }
             
            })
      
      
      
      
            const number2 =    Math.abs(number-3) 
      const element2 = arrayChildren[number2]
      const name2 = children[element2].Name
      const expl2 = children[element2].Expl
      const vote2 = children[element2].Vote
      document.getElementById('name-rand-third').innerHTML = name2
            document.getElementById('expl-rand-third').innerHTML = expl2
            document.getElementById('vote-rand-third').innerHTML = vote2 + ' votes'
      
            document.getElementById('rand-vote-third').addEventListener('click', ()=>{
                if (document.getElementById('rand-vote-third').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('rand-vote-third').style.color = 'gray'
                document.getElementById('rand-vote-third').style.cursor = 'default'
                    const newvote = vote2 + 1
                update(
                ref(db, 'Functionalities/'+name2),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
      
            
      
            const number3 =    Math.abs(number-4) 
      const element3 = arrayChildren[number3]
      const name3 = children[element3].Name
      const expl3 = children[element3].Expl
      const vote3 = children[element3].Vote
      document.getElementById('name-rand-fourth').innerHTML = name3
            document.getElementById('expl-rand-fourth').innerHTML = expl3
            document.getElementById('vote-rand-fourth').innerHTML = vote3 + ' votes'
      
            document.getElementById('rand-vote-fourth').addEventListener('click', ()=>{
                if (document.getElementById('rand-vote-fourth').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('rand-vote-fourth').style.color = 'gray'
                document.getElementById('rand-vote-fourth').style.cursor = 'default'
                    const newvote = vote3 + 1
                update(
                ref(db, 'Functionalities/'+name3),{
                
                Vote: newvote,
      
        }
        )
                }
               
            })
      
      
            const number4 =   Math.abs(number-5) 
      const element4 = arrayChildren[number4]
      const name4 = children[element4].Name
      const expl4 = children[element4].Expl
      const vote4 = children[element4].Vote
      document.getElementById('name-rand-fifth').innerHTML = name4
            document.getElementById('expl-rand-fifth').innerHTML = expl4
            document.getElementById('vote-rand-fifth').innerHTML = vote4 + ' votes'
      
      
            document.getElementById('rand-vote-fifth').addEventListener('click', ()=>{
                if (document.getElementById('rand-vote-fifth').style.color == 'gray') {
                    console.log('nothing');
                }
                else{
                    document.getElementById('rand-vote-fifth').style.color = 'gray'
                document.getElementById('rand-vote-fifth').style.cursor = 'default'
                    const newvote = vote4 + 1
                update(
                ref(db, 'Functionalities/'+name4),{
                
                Vote: newvote,
      
        }
        )
                }
                
            })
      
      })
      
      
      
        //Send funtionality
        document.getElementById('send-func').addEventListener('click',()=>{
        const nameFunc = document.getElementById('name-functionality').value
        const explFunc = document.getElementById('explenation').value
       
        set(
        ref(db, 'Functionalities/'+nameFunc),{
          Name: nameFunc,
          Expl: explFunc,
          Vote: 0,
      
        }
        )
        document.getElementById('name-functionality').value = null
        document.getElementById('explenation').value = null
        })

    
  })

 
 



  }, 500);
  
export default function Home() {
  
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}  >
      <div className={styles.loginDiv} id='logindiv' >
            <h1>Login</h1>
            <input className={styles.mail} type='text' id='inp-mail' ></input> <br></br>
            <input className={styles.pass} type='password' id='inp-pass' ></input> <br></br>
            <button className={styles.loginBtn} id='login-btn' >Login</button>

        </div>
      <a href="index.html">
       
<img src="/detector-large-logo copy.png" alt="GPT detector-large-logo" id="logo" ></img> 
</a>
<h1 className={styles.h1} id='caca' >Welcome!</h1>
<p  className={styles.pBegin}  >Here you can shape the software so it fits your needs!</p>
<div  className={styles.whatlanguagediv}>
<h4 className={styles.h4} >What language should we add next?</h4>
<select name="" id="select-lang">
    <option value="spanish">Spanish</option>
    <option value="italian">Italian</option>
    <option value="portuguese">Portuguese</option>
    <option value="swedish">Swedish</option>
    <option value="german">German</option>
    <option value="danish">Danish</option>
</select>
<button id="language-btn"  >send</button>
<p id="popular-lang" >Most popular language: Spanish  <span id="popular-lang-span" >2k votes</span> </p>
</div>
<div className={styles.topfuncdiv}>
<h4 className={styles.h4}>Top 3 new functionalities</h4>

<div  className={styles.firstfunc}>
    <h5 id="first-top-name" >1ste functionality</h5>
    <p  id="first-top-expl" >explaination of the functionality...</p>
    <div  className={styles.line}>
        <button id="vote-btn-top-first" >vote</button>
        <p id="first-top-vote" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc} >
    <h5 id="second-top-name" >2nd functionality</h5>
    <p id="second-top-expl" >explaination of the functionality...</p>
    <div  className={styles.line} >
        <button id="vote-btn-top-second">vote</button>
        <p id="second-top-vote" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc}>
    <h5 id="third-top-name" >3th functionality</h5>
    <p id="third-top-expl" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="vote-btn-top-third">vote</button>
        <p id="third-top-vote" >20 votes</p>
    </div>
</div>
</div>

<div  className={styles.randomfuncdiv}>
<h4 className={styles.h4}>5 random functionalities</h4>

<div className={styles.firstfunc}>
    <h5 id="name-rand-first" >1ste functionality</h5>
    <p id="expl-rand-first" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="rand-vote-first" >vote</button>
        <p id="vote-rand-first" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc}>
    <h5 id="name-rand-second" >2nd functionality</h5>
    <p id="expl-rand-second" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="rand-vote-second" >vote</button>
        <p id="vote-rand-second" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc}>
    <h5 id="name-rand-third" >3th functionality</h5>
    <p id="expl-rand-third" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="rand-vote-third" >vote</button>
        <p id="vote-rand-third" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc}>
    <h5 id="name-rand-fourth" >3th functionality</h5>
    <p id="expl-rand-fourth" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="rand-vote-fourth" >vote</button>
        <p id="vote-rand-fourth" >20 votes</p>
    </div>
</div>
<div className={styles.firstfunc}>
    <h5 id="name-rand-fifth" >3th functionality</h5>
    <p id="expl-rand-fifth" >explaination of the functionality...</p>
    <div className={styles.line}>
        <button id="rand-vote-fifth" >vote</button>
        <p id="vote-rand-fifth" >20 votes</p>
    </div>
</div>
</div>
<div className={styles.makeyours}>
<h4 className={styles.h4}>Make your functionality!</h4>
<div  className={styles.wrapmake} >
    <p>Name of your functionality:</p>
    <input type="text" name="" id="name-functionality"></input>
    
    <p>Explain it in a simple way:</p>
    <textarea className={styles.textarea}  name="" id="explenation" cols="30" rows="10"></textarea> <br></br>
    <button id="send-func" >send</button>
</div>
</div>
      </main>

      

      <style jsx>{`
         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        *{
            font-family: Inter;
        }
        body{
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: white;
            
        }
        #logo{
            position: absolute;
            top: 2%;
            left: 1%;
            height: 100px;
        }
        h1{
            font-family: Inter;
            font-weight: 400;
            font-size: 5rem;
            margin-bottom: 0;
        }
        .pBegin{
            font-family: Inter;
            color: gray;
            margin-top: 0;
        }
        .whatlanguagediv{
            margin-top: 4em;
            background-color: #0043eb;
            color: white;
            text-align: left;
            width: 50vw;
            margin-left: 50%;
            transform: translate(-50%);
            border-radius: 2em;
            height: fit-content;
            padding-bottom: 2em ;
            padding: 1em;
            box-shadow: 1px 1px 10px black;
        }
        h4{
            font-size: 1.5em;
        }
        .whatlanguagediv select{
            width: 70%;
            border-radius: 1em;
            font-size: 1rem;
            padding-top: 1em;
            padding-bottom: 1em;
            border: none;
            padding-left: .5em;
        }
        .whatlanguagediv button{
            cursor: pointer;
            height: 4em;
            border-radius: 1em;
            border: none;
            width: 20%;
            margin-left:1em;
            background-color: #e9e9e9;
        
        }
        .topfuncdiv{
            box-shadow: 1px 1px 10px black;
                margin-top: 4em;
                background-color: #0047FF;
                color: white;
                text-align: left;
                width: 50vw;
                margin-left: 50%;
                transform: translate(-50%);
                border-radius: 2em;
                height: fit-content;
                padding: 1em;
            
        }
        .firstfunc{
            background-color: white;
            color: black;
            border-radius: 1em;
            padding-left: 1em;
            padding-right: 1em;
        
            padding-top: .5em;
            padding-bottom: .5em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.566);
            margin-top: 1em;
        }
        .firstfunc h5{
            font-size: 1.5rem;
            margin: 0;
            margin-top: .3em;
        }
        .firstfunc p{
            font-weight: 300;
        }
        .line{
            border-top: 1px solid black;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .line button{
            background-color: transparent;
            border: none;
            font-weight: 600;
            cursor: pointer;
        }
        
        
        .randomfuncdiv{
            box-shadow: 1px 1px 10px black;
                margin-top: 4em;
                background-color: #0047FF;
                color: white;
                text-align: left;
                width: 50vw;
                margin-left: 50%;
                transform: translate(-50%);
                border-radius: 2em;
                height: fit-content;
                padding: 1em;
            
        }
        .makeyours{
            box-shadow: 1px 1px 10px black;
            margin-top: 4em;
            background-color: #0047FF;
            color: white;
            text-align: left;
            width: 50vw;
            margin-left: 50%;
            transform: translate(-50%);
            border-radius: 2em;
            height: fit-content;
            padding: 1em;
            margin-bottom: 3em;
        }
        .makeyours input{
            width: 70%;
            border-radius: 1em;
            font-size: 1rem;
            padding-top: 1em;
            padding-bottom: 1em;
            border: none;
            padding-left: .5em;
            background-color: #e9e9e9;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        }
        .makeyours textarea{
            width: 80%;
            resize: none;
            border-radius: 1em;
            background-color: #e9e9e9;
            border: none;
            margin-bottom: 1em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        }
        .wrapmake{
            background-color: white;
            color: black;
            padding: 1em;
            border-radius: 1em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        
        }
        .makeyours button{
            height: 30px;
            width: 100px;
            border: none;
            border-radius: 1em;
            background-color: #e9e9e9;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
            cursor: pointer;
        }
        textarea{
            padding-left: 1em;
            padding-top: 1em;
            font-size: 1rem;
        }
        
        @media (max-width: 838px) {
            h1{
                margin-top: 2em;
            }
        }
        @media (max-width: 450px) {
            h1{
                margin-top: 2em;
                font-size: 4rem;
            }
            .randomfuncdiv{
                width: 70vw;
            }
            .topfuncdiv{
                width: 70vw;
            }
            .whatlanguagediv{
                width: 70vw;
            }
            .makeyours{
                width: 70vw;
            }
        }
      `}</style>
       
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        *{
            font-family: Inter;
        }
        body{
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: white;
        }
        #logo{
            position: absolute;
            top: 2%;
            left: 1%;
            height: 100px;
        }
        h1{
            font-family: Inter;
            font-weight: 400;
            font-size: 5rem;
            margin-bottom: 0;
        }
        .pBegin{
            font-family: Inter;
            color: gray;
            margin-top: 0;
        }
        .whatlanguagediv{
            margin-top: 4em;
            background-color: #0043eb;
            color: white;
            text-align: left;
            width: 50vw;
            margin-left: 50%;
            transform: translate(-50%);
            border-radius: 2em;
            height: fit-content;
            padding-bottom: 2em ;
            padding: 1em;
            box-shadow: 1px 1px 10px black;
        }
        h4{
            font-size: 1.5em;
        }
        .whatlanguagediv select{
            width: 70%;
            border-radius: 1em;
            font-size: 1rem;
            padding-top: 1em;
            padding-bottom: 1em;
            border: none;
            padding-left: .5em;
        }
        .whatlanguagediv button{
            cursor: pointer;
            height: 4em;
            border-radius: 1em;
            border: none;
            width: 20%;
            margin-left:1em;
            background-color: #e9e9e9;
        
        }
        .topfuncdiv{
            box-shadow: 1px 1px 10px black;
                margin-top: 4em;
                background-color: #0047FF;
                color: white;
                text-align: left;
                width: 50vw;
                margin-left: 50%;
                transform: translate(-50%);
                border-radius: 2em;
                height: fit-content;
                padding: 1em;
            
        }
        .firstfunc{
            background-color: white;
            color: black;
            border-radius: 1em;
            padding-left: 1em;
            padding-right: 1em;
        
            padding-top: .5em;
            padding-bottom: .5em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.566);
            margin-top: 1em;
        }
        .firstfunc h5{
            font-size: 1.5rem;
            margin: 0;
            margin-top: .3em;
        }
        .firstfunc p{
            font-weight: 300;
        }
        .line{
            border-top: 1px solid black;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .line button{
            background-color: transparent;
            border: none;
            font-weight: 600;
            cursor: pointer;
        }
        
        
        .randomfuncdiv{
            box-shadow: 1px 1px 10px black;
                margin-top: 4em;
                background-color: #0047FF;
                color: white;
                text-align: left;
                width: 50vw;
                margin-left: 50%;
                transform: translate(-50%);
                border-radius: 2em;
                height: fit-content;
                padding: 1em;
            
        }
        .makeyours{
            box-shadow: 1px 1px 10px black;
            margin-top: 4em;
            background-color: #0047FF;
            color: white;
            text-align: left;
            width: 50vw;
            margin-left: 50%;
            transform: translate(-50%);
            border-radius: 2em;
            height: fit-content;
            padding: 1em;
            margin-bottom: 3em;
        }
        .makeyours input{
            width: 70%;
            border-radius: 1em;
            font-size: 1rem;
            padding-top: 1em;
            padding-bottom: 1em;
            border: none;
            padding-left: .5em;
            background-color: #e9e9e9;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        }
        .makeyours textarea{
            width: 80%;
            resize: none;
            border-radius: 1em;
            background-color: #e9e9e9;
            border: none;
            margin-bottom: 1em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        }
        .wrapmake{
            background-color: white;
            color: black;
            padding: 1em;
            border-radius: 1em;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
        
        }
        .makeyours button{
            height: 30px;
            width: 100px;
            border: none;
            border-radius: 1em;
            background-color: #e9e9e9;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.454);
            cursor: pointer;
        }
        textarea{
            padding-left: 1em;
            padding-top: 1em;
            font-size: 1rem;
        }
        
        @media (max-width: 838px) {
            h1{
                margin-top: 2em;
            }
        }
        @media (max-width: 450px) {
            h1{
                margin-top: 2em;
                font-size: 4rem;
            }
            .randomfuncdiv{
                width: 70vw;
            }
            .topfuncdiv{
                width: 70vw;
            }
            .whatlanguagediv{
                width: 70vw;
            }
            .makeyours{
                width: 70vw;
            }
        }
      `}</style>
    </div>
    
  )
  function caca() {
    console.log('caca');
  }
  
 
}
