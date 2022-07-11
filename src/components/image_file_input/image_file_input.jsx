import React, { useRef, useState }from 'react';
import styles from './image_file_input.module.css';
import { useObserver  } from 'mobx-react';

const Image_file_input = ({ imageUploader, name, onFileChange }) => {
    const inputRef = useRef();
    const [loading, setLoading] = useState(false); //boolean state

    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }

    const onChange = async event => {
        setLoading(true);
        const uploaded = await imageUploader.upload(event.target.files[0]); 
        setLoading(false);

        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url,
        })
    };

    return <div className={styles.container}>
        <input 
            ref={inputRef}
            className={styles.input} 
            type="file" 
            accept="image/*" 
            name="file" 
            onChange={onChange}/>

        { !loading && 
            <button 
                className={`${styles.button} ${name ? styles.pink: styles.grey}`} 
                onClick={onButtonClick}> 
                {name || 'No file'} 
            </button> }
        { loading && 
            <div className={styles.loading}></div>}
    </div>
};

export default Image_file_input;
