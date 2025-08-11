import React from 'react'

function parsePoint(point: string) {
    const isNumbered = /^\d+\./.test(point);
    const isMainPoint = /^•/.test(point);
    // const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}]/u;
    const emojiRegex = /[\u{1f300}-\u{1f9ff}]|[\u{2600}-\u{26ff}]/u
    const hasEmoji = emojiRegex.test(point);
    const isEmpty = !point.trim();

    return {
        isNumbered,
        isMainPoint,
        hasEmoji,
        isEmpty
    };
}

export function parseEmojiPoint(content: string) {
    const cleanContent = content.replace(/^[•*\-]\s*/, '').trim();
    const emojiPattern = /^([\p{Emoji}\p{S}\p{So}]+)\s*(.+)$/u;
    const matches = cleanContent.match(emojiPattern);

    // 3. Fallback for non-emoji lines (like your example)
    if (!matches || matches.length < 3) {
        return {
            emoji: null,
            text: content.trim()
        };
    }

    const [_, emoji, text] = matches;

    return {
        emoji: emoji.trim(),
        text: text.trim()
    };
}


const EmojiPoint = ({ point }: { point: string, }) => {
    const { emoji, text } = parseEmojiPoint(point) ?? {};

    return (
        <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex items-start gap-3">
                <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    )
}


const RegularPoint = ({ point }: { point: string; }) => {
    const { emoji, text } = parseEmojiPoint(point) ?? {};

    return (
        <div className="group relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex items-start gap-3">
                <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}



const ContentSection = ({ title, points }: {
    title: string;
    points: string[];
}) => {

    // console.log(points);
    return (
        <div className='space-y-4'>
            {
                points.map((point, index) => {
                    const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
                    if (isEmpty) return null;
                    if (hasEmoji || isMainPoint) {
                        return <EmojiPoint key={`point-${point}`} point={point} />
                    } else {
                        return <RegularPoint key={`point-${index}`} point={point} />
                    }
                })
            }
        </div>
    )
}

export default ContentSection