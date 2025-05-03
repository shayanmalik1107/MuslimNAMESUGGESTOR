import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { constant } from '../utils/mesgs';
import { colors } from '../utils/colors';
import { font } from '../asset/fonts';
import { Names } from '../../NAMES';
import firebase from '../../firebaseConfig';

const GenderSelect = () => {
	const [Selected, setSelected] = useState('first');
	const [expanded, setexpanded] = useState('null');
	const [namesData, setNamesData] = useState({ boys: {}, girls: {} });

	useEffect(() => {
		const fetchData = async () => {
			const ref = firebase.database().ref('/names');
			try {
				const snapshot = await ref.once('value');
				if (!snapshot.exists()) {
					await ref.set({
						boys: Names.boys,
						girls: Names.girls,
					});
					console.log('Data saved to Firebase');
				}
				const data = snapshot.val();
				setNamesData(data);
			} catch (error) {
				console.error('Error fetching and setting data to Firebase:', error);
			}
		};
		fetchData();
		return () => {
			firebase.database().ref('/names').off();
		};
	}, []);
	const clicked = (letter) => {
		setexpanded(expanded === letter ? 'null' : letter);
	};

	const selectedNames = Selected === 'first' ? namesData.boys : namesData.girls;
	const data = Object.entries(selectedNames || {})
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([letter, names]) => ({
			letter,
			names,
		}));


	const render = ({ item }) => (
		<View style={styles.forthV}>
			<TouchableOpacity onPress={() => clicked(item.letter)}>
				<Text style={styles.ForthT}>{item.letter}</Text>
			</TouchableOpacity>
			{expanded === item.letter &&
				item.names.map((nameObj, index) => (
					<View key={`${item.letter}-${index}`} style={styles.Textnames}>
						<Text style={styles.TextName}>{nameObj.name}</Text>
						<Text style={styles.TextNameM}> - {nameObj.meaning}</Text>
					</View>
				))}
		</View>
	);

	return (
		<View style={styles.backgound}>
			<View style={styles.firstView}>
				<Text style={styles.firsttext}>{constant.Welcomemesg}</Text>
			</View>

			<View style={styles.secView}>
				<Text style={styles.secText}>{constant.Selection}</Text>
			</View>

			<View style={styles.thirdtV}>
				<TouchableOpacity onPress={() => { setSelected('first'); setexpanded('null'); }}>
					<View style={styles.thirdofONEV}>
						<Text style={[
							styles.thirdofONET,
							{ backgroundColor: Selected === 'first' ? '#AED9E0' : 'white' },
						]}>
							{constant.MaleG}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { setSelected('second'); setexpanded('null'); }}>
					<View>
						<Text style={[
							styles.thirdofTWOT,
							{ backgroundColor: Selected === 'second' ? '#F1DBEA' : 'white' },
						]}>
							{constant.FemaleG}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			<FlatList data={data} renderItem={render} keyExtractor={(item) => item.letter} />
		</View>
	);
};

const styles = StyleSheet.create({
	firstView: { padding: 30 },
	firsttext: {
		fontSize: 22,
		color: colors.thumbText,
		fontFamily: font.headingfontfamily,
	},
	backgound: { backgroundColor: colors.background, flex: 1 },
	secView: { marginLeft: 33, marginTop: 5 },
	secText: { color: colors.selectC, fontSize: 16 },
	thirdtV: {
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 25,
	},
	thirdofONEV: { marginLeft: 30, flexDirection: 'row' },
	thirdofONET: {
		fontSize: 12,
		textAlign: 'center',
		textAlignVertical: 'center',
		color: colors.borderbackground,
		width: 176,
		height: 50,
		borderRadius: 2,
		fontFamily: font.GenderfontfamilyBoy,
	},
	thirdofTWOT: {
		fontSize: 12,
		textAlign: 'center',
		textAlignVertical: 'center',
		height: 50,
		width: 176,
		color: colors.borderbackground2,
		borderRadius: 2,
		fontFamily: font.GenderfontfamilyGirl,
	},
	forthV: { marginLeft: 28, marginRight: 28 },
	ForthT: {
		color: colors.background,
		borderWidth: 1,
		backgroundColor: colors.alphabetbackcolor,
		textAlign: 'center',
		padding: 1,
	},
	Textnames: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 5,
		paddingRight: 5,
		borderWidth: 1,
		borderColor: colors.namesbordercolor,
		backgroundColor: colors.namesbackgorundcolor,
	},
	TextName: {
		color: colors.textcolor,
		fontFamily: font.TextNamesfontfamily,
	},
	TextNameM: {
		color: colors.textmeaningcolor,
		fontFamily: font.TextNamesfontfamily,
		fontSize: 8,
		textAlignVertical: 'center',
	},
});

export default GenderSelect;
