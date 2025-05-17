
export default function prayer({name , time}) {
  return (
    <div className="prayer">
    <p className="name-prayer">{name}</p>
    <p className="time-prayer">{time}</p>
    </div>
  )
}
