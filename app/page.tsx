import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "./debug";
import { currentURL } from "./utils";

type State = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
  };
};

function getFrameImage(activePage: string, inputText?: string) {
  let bullet = 3;
  if(Math.floor(Math.random() * 6) + 1===bullet){
    return <FrameImage src="https://media.istockphoto.com/id/482486999/photo/one-bullet-in-chamber-of-gun-as-in-russian-roulette.jpg?s=612x612&w=0&k=20&c=pHmUMdRlzw360lBH5VEarLuK2Q8qEyWNRe8IesUP8us=" />
  }
  else{
    return <FrameImage src="https://media.istockphoto.com/id/506430662/photo/gun-fire.jpg?s=612x612&w=0&k=20&c=SFoLEoFf0ORDFVx_16axduXFOsTvvh_Px1gmSCHdUUw=" />
  }
  // else if(Math.floor(Math.random() * 6) + 1===1){
  //   return <FrameImage src="https://i.pinimg.com/originals/1c/22/4e/1c224efc37f29e04760a7ba59e216c0e.jpg" />
  // }
  // else if(Math.floor(Math.random() * 6) + 1===2){
  //   return <FrameImage src="https://i.pinimg.com/originals/1c/22/4e/1c224efc37f29e04760a7ba59e216c0e.jpg" />
  // }
  // else if(Math.floor(Math.random() * 6) + 1===4){
  //   return <FrameImage src="https://i.pinimg.com/originals/1c/22/4e/1c224efc37f29e04760a7ba59e216c0e.jpg" />
  // }
  // else if(Math.floor(Math.random() * 6) + 1===5){
  //   return <FrameImage src="https://i.pinimg.com/originals/1c/22/4e/1c224efc37f29e04760a7ba59e216c0e.jpg" />
  // }
  // else if(Math.floor(Math.random() * 6) + 1===6){
  //   return <FrameImage src="https://i.pinimg.com/originals/1c/22/4e/1c224efc37f29e04760a7ba59e216c0e.jpg" />
  // }
  

  // switch (activePage) {
  //   case "1":
  //     return <FrameImage src="https://feyyum-web.vercel.app/ibrahim_tatlisesi_tehdit_etti_yemin_olsun_ben_bu_kani_dokecegim_1674967086_421.jpeg" />
  //   case "2":
  //     return <FrameImage aspectRatio="1.91:1"><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>İbrahim Tatlısese mesajın: {inputText}</div></FrameImage>
  //   case "3":
  //     return <FrameImage src="https://media.istockphoto.com/id/506430662/photo/gun-fire.jpg?s=612x612&w=0&k=20&c=SFoLEoFf0ORDFVx_16axduXFOsTvvh_Px1gmSCHdUUw=" />
  //   default:
  //     return null
  // }
}

// This is a react server component only
export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/");
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
  });

  // const frameMessage = await getFrameMessage(previousFrame.postBody);

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  console.log("info: state is:", state);

  // then, when done, return next frame
  return (
    <div className="p-4">
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>{" "}
      or see{" "}
      <Link href="/examples" className="underline">
        other examples
      </Link>
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {getFrameImage(state?.active, frameMessage?.inputText)}
       
         
        
        <FrameButton>
          {/* {state?.active === "1" ? "Active" : "Inactive"} */}
          Vay vay
        </FrameButton>
        {/* <FrameButton>
          Vış Vış
        </FrameButton> */}
        {/* <FrameButton>
          Le le le
        </FrameButton> */}
        {/* <FrameButton action="link" target={`https://www.google.com`}>
          External
        </FrameButton> */}
        {/* <FrameButton action="link" target={`https://www.youtube.com/watch?v=v5eBn099zmw`}>
          BAGLAMA!
        </FrameButton> */}
      </FrameContainer>
    </div>
  );
}