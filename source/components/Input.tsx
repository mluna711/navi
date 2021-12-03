import React, { FC, useContext, useEffect } from "react";
import { Box, Text, useInput, useFocus } from "ink";
import { colors } from "@constants/theme";
import { Context } from '../ui';

interface Props {
	onChange: (value: string) => void;
	value: string;
	password?: boolean;
}
const Input: FC<Props> = ({ onChange, value, password = false }) => {
	const { isFocused } = useFocus();

  const context = useContext(Context);
  const toggleNavigationIfNeeded = () => {
    // on login context will be undefined
    if (!context) return;
    
    context.toggleNavigation(isFocused);
  }
  useEffect(toggleNavigationIfNeeded, [isFocused]);

	useInput((input, key) => {
    if (key.escape) return toggleNavigationIfNeeded();
		if (!isFocused) return;
		const newValue = key.delete
			? value.slice(0, input.length - 1)
			: `${value}${input}`;
		onChange(newValue);
	});

	return (
		<Box
			borderColor={colors.white}
			borderStyle={isFocused ? "bold" : "single"}
			minWidth={18}
		>
			{/* height fix */}
			<Text wrap="wrap">{(password ? "*".repeat(value.length) : value) || " "}</Text>
		</Box>
	);
};

export default Input;
