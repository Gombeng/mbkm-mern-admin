import React from 'react';

const Message = ({ children, ...rest }) => {
	return <p {...rest}>{children}</p>;
};

export default Message;
