import { Link } from 'react-router'

const HootList = ({ hoots }) => {
    return (
        <main>
            {hoots.map((hoot) => (
                <Link key={hoot.id} to={`/hoots/${hoot.id}`}>
                    <article>
                        <header>
                            <h2>{hoot.title}</h2>
                            <p>
                                {`${hoot.author_username} posted on
                ${new Date(hoot.created_at).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{hoot.text}</p>
                    </article>
                </Link>
            ))}
        </main>
    )
}

export default HootList
