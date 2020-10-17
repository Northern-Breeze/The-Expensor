import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    plot: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header:{
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    infoHeader: {
        flexDirection: "row",
        justifyContent:'space-between'
    },
    headerTitle: {
        padding: 10,
    },
    headerTitleText: {
        color: '#640fdb',
        fontSize: 20,
    },
    toggleControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        padding: 2
    },
    textContainerD: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        marginHorizontal: 2,
        borderRadius: 20,
        backgroundColor: '#b5a8a7'
    },
    textContainerW: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        marginHorizontal: 2,
        borderRadius: 20,
        backgroundColor: '#b5a8a7'
    }, 
    textContainerM: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        marginHorizontal: 2,
        borderRadius: 20,
        backgroundColor: '#b5a8a7'
    },
    controlTextD: {
        color: '#fff'
    },
    controlTextW: {
        color: '#640fdb'
    },
    controlTextM: {
        color: '#fff'
    },
    graph: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
        marginHorizontal: 5,    
    },
    transactions: {
        flex: 1
    },
    transactionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    transactionTextContainer: {
        marginLeft: 5
    },  
    transactionText: {
        color: '#640fdb',
        fontSize: 20,
        fontWeight: 'bold'
    },
    orderByTextContainer: {
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-between'
    },
    controlAction: {
        marginRight: 8
    },  
    orderByText: {
        color: '#640fdb',
        fontSize: 13
    },
    card: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 20,
        marginHorizontal: 10,
        width: 390,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    iconContainer: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        backgroundColor: '#5407b5',
        borderRadius: 20,
        height: 85,
        width: 90,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center",
        right: -5
    },
    cardInfoContainer: {
        flexDirection: 'column',
        padding: 10,
        marginRight: 10
    },
    referenceContainer: {
        paddingVertical: 2,
    },
    reference: {
        fontWeight: 'bold',
        fontSize: 13
    },
    cartigoryContainer: {
        paddingVertical: 2
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    amountContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    amount: {
        fontSize: 17,
        color: 'red',
        fontWeight: "bold"
    }
})

export default styles;