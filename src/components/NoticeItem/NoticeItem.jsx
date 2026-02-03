export default function NoticesItem({ item }) {
    return (
        <div>
            <h2>{item.title}</h2>
             <img src={item.imgURL} alt={item.title} />
        </div>
    );
}