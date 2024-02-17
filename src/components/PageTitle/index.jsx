import './styles.css';

export default function PageTitle({text}) {
    return (
        <div className='container'>
            <h1 className='title'>{text}</h1>
        </div>
    )
}