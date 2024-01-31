
interface MessageContainerProps {
    messages: any[];

}

export function MessageContainer({ messages }: MessageContainerProps) {
    return (
        <>
        {
            messages.map((message, index) => {
                return (
                    <div key={index}>
                        {message}
                    </div>
                )
            })
        }
        </>
    )

}