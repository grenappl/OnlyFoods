import React, { useState } from 'react'

function useUser() {
    const [user, setUser] = useState({
        
    });

    return [user, setUser]
}

export default useUser