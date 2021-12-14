const ApplicationForm = ({}) => {

    const fakeFiles = ['whitepaper.pdf', 'yellowpaper.pdf']

    return (
        <div style={{ background: "#46469814" }}>
        <div className="main">
            <div className="w-3/5 mx-auto flex flex-col space-y-10 py-6">
            <div className="mx-auto flex flex-col space-y-2">
                <h1 className="mx-auto text-5xl font-extrabold text-gray-900">Enter the DAO race!</h1>
                <p1 className="mx-auto">Hyperscale Application (next race in x days)</p1>
            </div>

            <div className="py-14 px-20 rounded-lg" style={{ background: "#46469814" }}>
                <form className="flex flex-col space-y-6 ">
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                    Email
                    </label>
                    <input
                    className="p-6 h-6  border-b-2 rounded-lg"
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="project-name" className="mb-2 font-semibold">
                    Project name
                    </label>
                    <input
                    className="p-6 h-6 border-b-2 rounded-lg"
                    id="project-name"
                    name="project-name"
                    type="text"
                    autoComplete="project-name"
                    required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pitch-tweet" className="mb-2 font-semibold">
                    Pitch us your project in a tweet
                    </label>
                    <textarea className="p-4 h-36 rounded-lg" id="pitch-tweet" name="pitch-tweet" type="text" required />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pitch-full" className="mb-2 font-semibold">
                    Pitch us your project
                    </label>
                    <textarea className="p-2 h-40 rounded-lg" id="pitch-full" name="pitch-full" type="text" required />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                    Provide some background on each founder
                    </label>
                    <textarea className="p-6 h-36 rounded-lg" id="pitch-tweet" name="pitch-tweet" type="text" required />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                    Please state evidence of exceptional ability for each founder
                    </label>
                    <textarea className="p-6 h-36 rounded-lg" id="pitch-tweet" name="pitch-tweet" type="text" required />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                    Is there anything else we should know about?
                    </label>
                    <textarea className="p-6 h-36 rounded-lg" id="pitch-tweet" name="pitch-tweet" type="text" required />
                </div>

                <div className="space-y-3">
                    <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                        Do you have any links to share?
                    </label>
                    <input
                        placeholder="https://"
                        className="p-6 h-6 rounded-lg"
                        id="link"
                        name="link"
                        type="text"
                        required
                    />
                    </div>
                    <button
                    className="p-3 mx-auto border border-indigo-600 rounded-xl text-left font-semibold"
                    style={{ color: "#5F75EE" }}
                    >
                    Add link
                    </button>
                </div>

                <div className="space-y-1">
                    <div className="flex flex-col">
                    <label htmlFor="email" className="mb-2 font-semibold">
                        Do you have any files to share?
                    </label>
                    </div>
                    <div className="align-middle h-16 rounded-lg" style={{ background: "#010C4B0D" }}>
                    <div className=" mx-auto p-5 flex flex-row ">
                        <img className="flex-none" src="Vector.png"></img>
                        <p1 className="px-3 grow font-normal" style={{ color: "#767676" }}>
                        Drag and drop some files...
                        </p1>
                        <button className="flex-none" style={{ color: "#5F75EE" }}>
                        Browse
                        </button>
                    </div>
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="email" className="py-3 mb-2 font-semibold">
                        Attachments:
                    </label>
                    </div>

                    <div class="container flex justify-center mx-auto" style={{background: "green"}}>

                        <table className="w-1/1 table-fixed hover:table-fixed" style={{background: "red"}}>
                        <tbody>
                            {
                                fakeFiles.forEach((fileName) => {
                                    <div>
                                        <td>{fileName}</td>
                                        <td>delete</td>
                                    </div>
                                })
                            }
                        </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="referral" className="mb-2 font-semibold">
                        Referral
                    </label>
                    <input
                        placeholder="Optional"
                        className="p-6 h-6 mb-4 border-b-2 rounded-lg"
                        id="referral"
                        name="referral"
                        type="text"
                        required
                    />
                    </div>

                    <div className="space-y-8">
                    <div className="mx-auto flex flex-row space-x-2">
                        {/* <input className="mx-auto" type="checkbox" class=" checked:bg-blue-500" /> */}

                        <label class="flex mx-auto space-x-1">
                        <input class="ml-2 mr-1 mb-1 mt-1 inline-block" type="checkbox" required />
                        <span class="text-sm inline-block">
                            <div className="flex flex-row space-x-1">
                            <p1 className="mx-auto font-semibold">I agree to the</p1>{" "}
                            <a className="font-semibold" href="url" style={{ color: "#5F75EE" }}>
                                {" "}
                                Terms{" "}
                            </a>
                            <p1 className="font-semibold"> and </p1>
                            <a className="font-semibold" href="url" style={{ color: "#5F75EE" }}>
                                {" "}
                                Privacy Policy
                            </a>
                            </div>
                        </span>
                        </label>
                    </div>

                    <div className="flex mx-auto">
                        <button
                        style={{ background: "#5F75EE", color: "#fff" }}
                        className="w-2/4 p-3 mx-auto border border-indigo-600 rounded-xl font-bold"
                        >
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ApplicationForm;
