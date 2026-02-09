import { useParams, Link } from 'react-router'
import { useState, useEffect, useContext } from 'react'

import * as hootService from '../../services/hootService'
import { UserContext } from '../../contexts/UserContext'

import CommentForm from '../CommentForm/CommentForm'

const HootDetails = ({ handleDeleteHoot }) => {
    const { hootId } = useParams()
    const [hoot, setHoot] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchHoot = async () => {
            const hootData = await hootService.show(hootId)
            setHoot(hootData)
        }
        fetchHoot()
    }, [hootId])

    const handleAddComment = async (commentFormData) => {
        const newComment = await hootService.createComment(
            hootId,
            commentFormData,
        )
        setHoot({ ...hoot, comments: [newComment, ...hoot.comments] })
    }

    if (!hoot) return <main>Loading...</main>
    return (
        <main>
            <section>
                <header>
                    <p>{hoot.category.toUpperCase()}</p>
                    <h1>{hoot.title}</h1>
                    <img src={hoot.image_url} width={300} />
                    <p>
                        {`${hoot.author_username} posted on
            ${new Date(hoot.created_at).toLocaleDateString()}`}
                    </p>
                    {hoot.hoot_author_id === user.id && (
                        <>
                            <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
                            <button onClick={() => handleDeleteHoot(hootId)}>
                                Delete
                            </button>
                        </>
                    )}
                </header>
                <p>{hoot.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!hoot.comments.length && <p>There are no comments.</p>}

                {hoot.comments.map((comment) => (
                    <article key={comment.comment_id}>
                        <header>
                            <p>
                                {`${comment.comment_author_username} posted on
                ${new Date(comment.comment_created_at).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{comment.comment_text}</p>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default HootDetails
