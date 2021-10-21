import { FormEvent, useState } from 'react';

const SignIn: React.FC = () => {
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        /*
        if(newRoom.trim() === '') {
            return;
        }

        const database = getDatabase()
        const roomRef = ref(database, 'users');

        //const firebaseRoom = await roomRef.push({
        //    title: newRoom,
        //    authorId: user?.id,
        //});
        */
        console.log("criou")
        //history.push(`/rooms/${firebaseRoom.key}`);
    }
    
    return (
        <>
        <h1>SignIn</h1>
        <form onSubmit={ handleCreateRoom }>
        <input 
            type="text"
            placeholder="Usuário"
            onChange={ event => setNewRoom(event.target.value) }
            value={ newRoom }
        />
        <button type="submit">VAIII</button>
        </form>
        
        </>
    );
}

export default SignIn;