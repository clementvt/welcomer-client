import { SignIn } from "@/components/loginButton";

export default function Error({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const error = searchParams.error;
    const error_description = searchParams.error_description
    
    return (
        <div className="container">
            <h1>There was an error :(</h1>
            <p>{error_description}</p>
            <SignIn text="Try again"/>
        </div>
    )
}
