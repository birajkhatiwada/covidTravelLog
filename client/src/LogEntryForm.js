import React, {useState} from 'react';
import {useForm } from 'react-hook-form';
import { createLogEntry} from './API';



const LogEntryForm = ({location, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();
    const { visitedRegister, handleVisitedSubmit} = useForm();
    const [visited, setVisited] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);

    const onSubmit = async(data)=>{
        try {
            console.log(data);
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            console.log(data);
            if(btnClicked && !visited){
                data.toVisit = "Visit: in the future";
            }
            const created = await createLogEntry(data);
            console.log("created");
            console.log(created);
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    }

    const setThing = (event)=>{
        try {
            // event.preventDefault();
            setVisited(event);
            setBtnClicked(true);
            console.log('setvisited is ', event);
            console.log(event);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div className="checkBtn" style={{
                display: btnClicked? 'none': 'block',
            }}>
                    <button  onClick={()=>setThing(true)}>Already Visited</button>
                    <button onClick={()=>setThing(false)}>Going to Visit</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="entry-form visited-form"
            style ={{
                display : btnClicked? 'block': null,
            }}
            >
                { error ? <h3 clasname="error">{error}</h3> : null}
                {/* { setVisited ? <h3> {h </h3>: <h3> {bye} </h3>} */}


                    {!visited?
                        <div>
                            <label htmlFor="title">Title</label>
                            <input name="title" required ref={register}/>
                            <label htmlFor="description">Description</label>
                            <textarea name="description" rows={3} ref={register}></textarea>
                            <button  disabled= {loading}> {loading ? 'Loading...' : 'Create Travel Log Entry'}</button>
                        </div>:
                        <div>
                            <label htmlFor="title">Title</label>
                            <input name="title" required ref={register}/>
                            <label htmlFor="description">How did it go?</label>
                            <textarea name="description" rows={3} ref={register}></textarea>
                            <label htmlFor="newFood">New Food Tried</label>
                            <input name="newFood" ref={register}></input>
                            <label htmlFor="image">Image</label>
                            <input name="image" ref={register}/>
                            <label htmlFor="rating">Rating</label>
                            <input name="rating" ref={register}/>
                            <label htmlFor="visitDate">Visit Date</label>
                            <input name="visitDate" type="date" required ref={register}/>
                            <button  disabled= {loading}> {loading ? 'Loading...' : 'Create Travel Log Entry'}</button>
                        </div>
                    }

                    {/* <label htmlFor="title">Title</label>
                    <input name="title" required ref={register}/>
                    <label htmlFor="description">How did it go?</label>
                    <textarea name="description" rows={3} ref={register}></textarea>
                    <label htmlFor="newFood">New Food Tried</label>
                    <input name="newFood" ref={register}></input>
                    <label htmlFor="image">Image</label>
                    <input name="image" ref={register}/>
                    <label htmlFor="rating">Rating</label>
                    <input name="rating" ref={register}/>
                    <label htmlFor="visitDate">Visit Date</label>
                    <input name="visitDate" type="date" required ref={register}/>
                    <button  disabled= {loading}> {loading ? 'Loading...' : 'Create Travel Log Entry'}</button> */}
            </form>

            {/* <form onSubmit={handleSubmit(onSubmit)} className="entry-form notVisited-form" style={{
                    display: btnClicked && !visited ? 'block': 'none',
                    }}>
                <div >
                    <label htmlFor="title">Title</label>
                    <input name="title" required ref={visitedRegister}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" rows={3} ref={visitedRegister}></textarea>
                    <button  disabled= {loading}> {loading ? 'Loading...' : 'Create Travel Log Entry'}</button>
                </div>
            </form> */}
        </div>
    );
};

export default LogEntryForm;