import Bio from "./Bio";

import ProfileImage from "./ProfileImage";

export default function ProfileInfo({ state, user }) {
  // const { state } = useProfile();
  console.log(state);
  return (
    <>
      {/* <!-- profile info --> */}
      <div className="flex flex-col items-center py-8 text-center">
        {/* <!-- profile image --> */}

        <ProfileImage state={state} user={user} />

        {/* <!-- name , email --> */}
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {state?.firstName} {state?.lastName}
          </h3>
          <p className="leading-[231%] lg:text-lg">{state?.email}</p>
        </div>
        {console.log(state?.bio)}
        <Bio user={user} bioState={state?.bio} />
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
      {/* <!-- end profile info --> */}
    </>
  );
}
