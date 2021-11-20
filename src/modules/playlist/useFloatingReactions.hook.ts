import { useEffect } from "react";
import floating from 'floating.js';
import { last } from "lodash";

const valueToEmoji = (val: 'fire' | 'party' | 'thumbdown') => {
  switch (val) {
    case 'fire':
      return "🔥"
    case "party":
      return "🥳"
    case 'thumbdown':
      return "👎"
    default:
      break;
  }
  
}

const useFloatingReactions = (reactions: string[] | undefined) => {
  useEffect(() => {
    if(reactions) {
      console.log(reactions);
      const lastReaction = last(reactions) as 'fire' | 'party' | 'thumbdown';
      if(lastReaction) {
      const lastReactionEmoji = valueToEmoji(lastReaction);
        floating({
          content: lastReactionEmoji,
          number: 12,
          duration: 5,
          repeat: 1,
          direction: 'normal',
          size: [3,4]
        });
      }
    }
  }, [reactions, reactions?.length])
}
export default useFloatingReactions;