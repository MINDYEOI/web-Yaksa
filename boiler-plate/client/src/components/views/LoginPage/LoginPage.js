import React from 'react'

function LoginPage() {
    return (
        <div style={{justifyContent:'center', alignItems: 'center', display:'flex', width:'100%'}}>
            <form style>
                <label>Email</label>
                <input type="email" value onChange />
                <label>Password</label>
                <input type="password" value onChange />

                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
