

function Register() {

    return <form className="register-form">
        <div className="input-pair">
            <label htmlFor="email-field">Email:</label>
            <input type="text" placeholder="email" className="email-field" />
        </div>
        <div className="input-pair">
            <label htmlFor="username-field">Set Username:</label>
            <input type="text" placeholder="username" className="username-field" />
        </div>
        <div className="input-pair">
            <label htmlFor="password-field">Set Password:</label>
            <input type="password" placeholder="password here" className="password-field" />
        </div>
        <button type="submit"> Register</button>
    </form>


}

export default Register