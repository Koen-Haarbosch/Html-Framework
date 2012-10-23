<%@ Page Language="VB" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs)
        divMessage.InnerHtml = ""
		

		totaalprijs.Text = txtHiddenPrice.Text
		
		If Page.IsPostBack Then
            
        Else
            rblInfo1.Checked = False
			rblInfo2.Checked = False
			rblInfo3.Checked = False
			rblInfo4.Checked = False
        End If
		
    End Sub

    Protected Sub cmdSave_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        Dim strMelding As String = ""
        
        Dim strInfo As String = ""
        If rblInfo1.Checked = True Then strInfo += "Dinsdag 19 januari: algemeen programma Eerste- en Tweedelijnszorg, "
        If rblInfo2.Checked = True Then strInfo += "Dinsdag 19 januari: programma MDL-artsen, internisten, infectiologen, "
		If rblInfo3.Checked = True Then strInfo += "Donderdag 21 januari:  Arbo-professionals, "
		If rblInfo4.Checked = True Then strInfo += "Zaterdag 23 januari: patiënten en hun omgeving"
        
        If strInfo = "" Then strMelding += "Er is nog geen dag aangevinkt<br/>"
		
		
        If txtNaam.Text = "" Then strMelding += "Naam, voorletters en titel  (m/v) niet ingevuld<br/>"
        If txtOrganisatie.Text = "" Then strMelding += "Organisatie niet ingevuld<br/>"
        If txtFunctie.Text = "" Then strMelding += "Functie niet ingevuld<br/>"
        If txtAdres.Text = "" Then strMelding += "Adres, postcode, plaats niet ingevuld<br/>"
		If txtTelefoonnummer.Text = "" Then strMelding += "Telefoonnummer niet ingevuld<br/>"
		
		'If txtEmailadres.Text = "" Then strMelding += "Emailadres niet ingevuld<br/>"      
		
		Dim pattern As String = "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"        
		Dim emailAddressMatch As Match = Regex.Match(txtEmailadres.Text, pattern)       
		 
		If emailAddressMatch.Success Then
			'strMelding += "Emailadres correct"
		Else            
			strMelding += "Emailadres niet correct ingevuld<br/>"      
		End If
		
		
		
        'If rblVervoer.SelectedIndex = -1 Then strMelding += "Niet alle vragen zijn beantwoord<br/>"
        
        If strMelding <> "" Then
            divMessage.InnerHtml = strMelding
            Exit Sub
        End If
        
        
        'Dim strFout As String
        Dim myMail As New Mail.MailMessage
        Dim strBody As String


        strBody += "<html><body>"
        
        strBody += "<p><strong>U heeft zich opgegeven voor: </strong><br />" & strInfo & "</p>"    
		
		If (rblInfo1.Checked = True) Then
			strBody += "<p><strong>Voorkeur workshops Dinsdag 19 januari: algemeen programma Eerste- en Tweedelijnszorg: </strong><br />Voorkeur 1: " & voorkeur_1_1.SelectedValue & "<br />Voorkeur 2: " & voorkeur_1_2.SelectedValue & "<br />Voorkeur 3: " & voorkeur_1_3.SelectedValue & "</p>"
		End If
		
		If (rblInfo3.Checked = True) Then
			strBody += "<p><strong>Voorkeur workshops Donderdag 21 januari:  Arbo-professionals: </strong><br />Voorkeur 1: " & voorkeur_3_1.SelectedValue & "<br />Voorkeur 2: " & voorkeur_3_2.SelectedValue & "<br />Voorkeur 3: " & voorkeur_3_3.SelectedValue & "</p>"
		End If
		
		If (rblInfo4.Checked = True) Then
			strBody += "<p><strong>Voorkeur workshops Zaterdag 23 januari: patiënten en hun omgeving: </strong><br />Voorkeur 1: " & voorkeur_4_1.SelectedValue & "<br />Voorkeur 2: " & voorkeur_4_2.SelectedValue & "<br />Voorkeur 3: " & voorkeur_4_3.SelectedValue & "</p>"
		End If
		
		If (chbLidVan.Checked = True) Then
			strBody += "<p><strong>Ik ben lid van de Nederlandse Leverpatiënten Vereniging: </strong>Ja</p>"
		Else
			strBody += "<p><strong>Ik ben lid van de Nederlandse Leverpatiënten Vereniging: </strong>Nee</p>"
		End If
		
		
		
		strBody += "<p><strong>Totaal bedrag: </strong>" & txtHiddenPrice.Text & "</p>"
        
        strBody += "<p><strong>Naam, voorletters en titel  (m/v): </strong>" & txtNaam.Text & "</p>"
        strBody += "<p><strong>Instelling: </strong>" & txtOrganisatie.Text & "</p>"
        strBody += "<p><strong>Functie: </strong>" & txtFunctie.Text & "</p>"
		strBody += "<p><strong>BIG registratienummer: </strong>" & txtBig.Text & "</p>"
        strBody += "<p><strong>Adres, postcode, plaats: </strong>" & txtAdres.Text & "</p>"
		strBody += "<p><strong>Telefoonnummer: </strong>" & txtTelefoonnummer.Text & "</p>"
		strBody += "<p><strong>Emailadres: </strong>" & txtEmailadres.Text & "</p>"
		


		If vervoerJa.Checked = True Then strBody += "<p><strong>Ik wil graag een Treinkaartje tweede klas: </strong>Ja</p>"
		If vervoerNee.Checked = True Then strBody += "<p><strong>Ik wil graag een Treinkaartje tweede klas: </strong>Nee</p>"
		
		strBody += "<p><strong>Speciale dieetwensen: </strong>" & txtDieetWensen.Text & "</p>"
		
      

        strBody += "</body></html>"

        myMail.From = "info@hepatitis.nl"
       
        myMail.To = "info@hepatitis.nl"
        'myMail.Cc = txtEmailadres.Text
        myMail.Cc = "lieven@bitsquad.nl"

        myMail.Subject = "Online registratie Landelijke Hepatitisweek 2010"
        myMail.BodyFormat = Mail.MailFormat.Html
        myMail.Body = strBody

        Mail.SmtpMail.SmtpServer = "mail.complat.nl"

        Mail.SmtpMail.Send(myMail)
        
        divMessage.InnerHtml = "Dank u voor uw registratie. Wij nemen zo spoedig mogelijk contact met u op."
        divForm.Visible = False
		
		Dim buildString as String
		
		buildString = "payment.aspx?e=" & txtEmailadres.Text & "&p=" & txtHiddenPrice.Text
		Response.Redirect(buildString)
		
    End Sub
</script>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title>Online registratie Landelijke Hepatitisweek 2010</title>
	<link href="styles/form.css" rel="stylesheet" type="text/css" media="screen" /></head>

</head>
<body>
<div id="wrapper">
    <form id="form1" runat="server">
    <div runat="server" id="divMessage" style="color:#CC0000;"></div>
    
    <div runat="server" id="divForm">  
    <h1>Online registratie Landelijke Hepatitisweek 2010</h1>
	<h2>‘Medische en sociale gevolgen van hepatitis’</h2>

    <div>
        <table>
            <tr>
                <td>Naam, voorletters en titel  (m/v) *</td>
                <td>
                    <asp:TextBox ID="txtNaam" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>            
            <tr>
                <td>Organisatie *</td>
                <td>
                    <asp:TextBox ID="txtOrganisatie" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Functie *</td>
                <td><asp:TextBox ID="txtFunctie" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
			<tr>
                <td>BIG registratienummer</td>
                <td><asp:TextBox ID="txtBig" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
			
            <tr>
                <td>Adres, postcode, plaats *</td>
                <td>
                    <asp:TextBox ID="txtAdres" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Telefoonnummer *</td>
                <td>
                    <asp:TextBox ID="txtTelefoonnummer" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
             <tr>
                <td>Emailadres *</td>
                <td>
                    <asp:TextBox ID="txtEmailadres" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
        </table>
    </div>
    
        <p><strong>Ik schrijf me in voor de volgende dag(en):</strong></p>
       <div>
           <asp:checkbox ID="rblInfo1" onclick="return checkChb1(rblInfo1);" runat="server" Value="80" text=" Dinsdag 19 januari: algemeen programma Eerste- en Tweedelijnszorg (&euro; 80,-)"/><br />
          
		   <div id="rblInfo1_keuze">
           	 <h3>Voorkeur workshop rondes</h3>
             
          	 <span class="title">Eerst voorkeur:</span>
             <asp:DropDownList id="voorkeur_1_1" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact">Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact</asp:ListItem>
                <asp:ListItem Value="Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?">Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?</asp:ListItem>
                <asp:ListItem Value="Co-infectie Hepatitis C en HIV">Co-infectie Hepatitis C en HIV</asp:ListItem>
                <asp:ListItem Value="Hepatitis B en C: Serologie en Behandeling">Hepatitis B en C: Serologie en Behandeling</asp:ListItem>
                <asp:ListItem Value="Hepatitis C : Opsporing verzocht!">Hepatitis C : Opsporing verzocht!</asp:ListItem>
                <asp:ListItem Value="Hepatitis C campagne">Hepatitis C campagne</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw </asp:ListItem>
                <asp:ListItem Value="Preventie verticale transmissie">Preventie verticale transmissie</asp:ListItem>
                <asp:ListItem Value="Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B">Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B</asp:ListItem>
                <asp:ListItem Value="Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)">Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)</asp:ListItem>                
             </asp:DropDownList> 
             
             <span class="title">Tweede voorkeur:</span>
             <asp:DropDownList id="voorkeur_1_2" runat="server">
             	<asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact">Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact</asp:ListItem>
                <asp:ListItem Value="Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?">Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?</asp:ListItem>
                <asp:ListItem Value="Co-infectie Hepatitis C en HIV">Co-infectie Hepatitis C en HIV</asp:ListItem>
                <asp:ListItem Value="Hepatitis B en C: Serologie en Behandeling">Hepatitis B en C: Serologie en Behandeling</asp:ListItem>
                <asp:ListItem Value="Hepatitis C : Opsporing verzocht!">Hepatitis C : Opsporing verzocht!</asp:ListItem>
                <asp:ListItem Value="Hepatitis C campagne">Hepatitis C campagne</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw </asp:ListItem>
                <asp:ListItem Value="Preventie verticale transmissie">Preventie verticale transmissie</asp:ListItem>
                <asp:ListItem Value="Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B">Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B</asp:ListItem>
                <asp:ListItem Value="Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)">Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)</asp:ListItem>          
             </asp:DropDownList> 
             
              <span class="title">Derde voorkeur:</span>
             <asp:DropDownList id="voorkeur_1_3" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact">Preventie op de werkvloer: Melding prikaccidenten en het voorkómen van accidenteel bloedcontact</asp:ListItem>
                <asp:ListItem Value="Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?">Hepatitis B in Nederland. Waar komt de evidence-base voor het vaccineren van risicogroepen vandaan?</asp:ListItem>
                <asp:ListItem Value="Co-infectie Hepatitis C en HIV">Co-infectie Hepatitis C en HIV</asp:ListItem>
                <asp:ListItem Value="Hepatitis B en C: Serologie en Behandeling">Hepatitis B en C: Serologie en Behandeling</asp:ListItem>
                <asp:ListItem Value="Hepatitis C : Opsporing verzocht!">Hepatitis C : Opsporing verzocht!</asp:ListItem>
                <asp:ListItem Value="Hepatitis C campagne">Hepatitis C campagne</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw </asp:ListItem>
                <asp:ListItem Value="Preventie verticale transmissie">Preventie verticale transmissie</asp:ListItem>
                <asp:ListItem Value="Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B">Korte Keten: verwijsrichtlijnen tussen GGD , huisarts  en specialist bij hepatitis B</asp:ListItem>
                <asp:ListItem Value="Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)">Culturele aspecten die een rol spelen bij immigranten met hepatitis B/C (m.n. Chinezen, Turken en Marokkanen)</asp:ListItem>          
             </asp:DropDownList> 
             
           </div>
           <asp:checkbox ID="rblInfo2" onclick="return checkChb2(rblInfo2);" runat="server" Value="80" text=" Dinsdag 19 januari: programma MDL-artsen, internisten, infectiologen (&euro; 80,-)"/><br />
          
           
           
           <asp:checkbox ID="rblInfo3" onclick="return checkChb3(rblInfo3);" runat="server" Value="80" text=" Donderdag 21 januari:  Arbo-professionals (&euro; 80,-)"/><br />
           
           
           <div id="rblInfo3_keuze">
            <h3>Voorkeur workshop rondes</h3>
          	<span class="title">Eerste voorkeur:</span>
             <asp:DropDownList id="voorkeur_3_1" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte">Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte</asp:ListItem>
                <asp:ListItem Value="Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever">Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever</asp:ListItem>
                <asp:ListItem Value="Omgaan met medische gegevens hepatitis in de werksituatie">Omgaan met medische gegevens hepatitis in de werksituatie</asp:ListItem>
                <asp:ListItem Value="Wat zou de arbeidsinspectie nog meer moeten doen?">Wat zou de arbeidsinspectie nog meer moeten doen?</asp:ListItem>
                <asp:ListItem Value="Risico op hepatitis E en werk">Risico op hepatitis E en werk</asp:ListItem>
                <asp:ListItem Value="Samenwerking Arbodienst en GGD bij uitbraak hepatitis A">Samenwerking Arbodienst en GGD bij uitbraak hepatitis A</asp:ListItem>
                <asp:ListItem Value="Richtlijn prikaccidenten">Richtlijn prikaccidenten</asp:ListItem>
                <asp:ListItem Value="Vaccinatie en advies aan de zakelijke reiziger">Vaccinatie en advies aan de zakelijke reiziger</asp:ListItem>
                <asp:ListItem Value="De gevolgen van virale hepatitis voor de werknemer en werkgever">De gevolgen van virale hepatitis voor de werknemer en werkgever</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw</asp:ListItem>           
             </asp:DropDownList> 
             
             <span class="title">Tweede voorkeur:</span>
             <asp:DropDownList id="voorkeur_3_2" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte">Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte</asp:ListItem>
                <asp:ListItem Value="Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever">Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever</asp:ListItem>
                <asp:ListItem Value="Omgaan met medische gegevens hepatitis in de werksituatie">Omgaan met medische gegevens hepatitis in de werksituatie</asp:ListItem>
                <asp:ListItem Value="Wat zou de arbeidsinspectie nog meer moeten doen?">Wat zou de arbeidsinspectie nog meer moeten doen?</asp:ListItem>
                <asp:ListItem Value="Risico op hepatitis E en werk">Risico op hepatitis E en werk</asp:ListItem>
                <asp:ListItem Value="Samenwerking Arbodienst en GGD bij uitbraak hepatitis A">Samenwerking Arbodienst en GGD bij uitbraak hepatitis A</asp:ListItem>
                <asp:ListItem Value="Richtlijn prikaccidenten">Richtlijn prikaccidenten</asp:ListItem>
                <asp:ListItem Value="Vaccinatie en advies aan de zakelijke reiziger">Vaccinatie en advies aan de zakelijke reiziger</asp:ListItem>
                <asp:ListItem Value="De gevolgen van virale hepatitis voor de werknemer en werkgever">De gevolgen van virale hepatitis voor de werknemer en werkgever</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw</asp:ListItem>           
             </asp:DropDownList> 
             
             <span class="title">Derde voorkeur:</span>
             <asp:DropDownList id="voorkeur_3_3" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte">Risicovormers en risicolopers– juridische achtergronden van een beroepsziekte</asp:ListItem>
                <asp:ListItem Value="Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever">Vaccinatie bijzondere doelgroepen in het bedrijf/ hoe kom je tot een vaccinatie advies aan de werkgever</asp:ListItem>
                <asp:ListItem Value="Omgaan met medische gegevens hepatitis in de werksituatie">Omgaan met medische gegevens hepatitis in de werksituatie</asp:ListItem>
                <asp:ListItem Value="Wat zou de arbeidsinspectie nog meer moeten doen?">Wat zou de arbeidsinspectie nog meer moeten doen?</asp:ListItem>
                <asp:ListItem Value="Risico op hepatitis E en werk">Risico op hepatitis E en werk</asp:ListItem>
                <asp:ListItem Value="Samenwerking Arbodienst en GGD bij uitbraak hepatitis A">Samenwerking Arbodienst en GGD bij uitbraak hepatitis A</asp:ListItem>
                <asp:ListItem Value="Richtlijn prikaccidenten">Richtlijn prikaccidenten</asp:ListItem>
                <asp:ListItem Value="Vaccinatie en advies aan de zakelijke reiziger">Vaccinatie en advies aan de zakelijke reiziger</asp:ListItem>
                <asp:ListItem Value="De gevolgen van virale hepatitis voor de werknemer en werkgever">De gevolgen van virale hepatitis voor de werknemer en werkgever</asp:ListItem>
                <asp:ListItem Value="Motivational interviewing en therapietrouw">Motivational interviewing en therapietrouw</asp:ListItem>           
             </asp:DropDownList> 
             
           </div>
           
           <asp:checkbox ID="rblInfo4" onclick="return checkChb4(rblInfo4);" runat="server" Value="20" text=" Zaterdag 23 januari: patiënten en hun omgeving (&euro; 20,-)
Lid van de Nederlandse Leverpatiënten Vereniging (gratis)"/><br />


<div id="rblInfo4_keuze">
			 <h3>Voorkeur workshop rondes</h3>
          	 <span class="title">Eerste voorkeur:</span>
             <asp:DropDownList id="voorkeur_4_1" runat="server">
             <asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Psychologische problemen bij virale hepatitis">Psychologische problemen bij virale hepatitis</asp:ListItem>
                <asp:ListItem Value="Re-integratie">Re-integratie</asp:ListItem>
                <asp:ListItem Value="Medische en sociale gevolgen bij kinderen met hepatitis ">Medische en sociale gevolgen bij kinderen met hepatitis </asp:ListItem>
                <asp:ListItem Value="Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?">Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?</asp:ListItem>
                <asp:ListItem Value="Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld">Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld</asp:ListItem>
                <asp:ListItem Value="Onderzoek">Trials: welke zijn er in Nederland en wat zijn de toekomstverwachtingen</asp:ListItem>
                
           
             </asp:DropDownList> 
             
             <span class="title">Tweede voorkeur:</span>
<asp:DropDownList id="voorkeur_4_2" runat="server">
	<asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Psychologische problemen bij virale hepatitis">Psychologische problemen bij virale hepatitis</asp:ListItem>
                <asp:ListItem Value="Re-integratie">Re-integratie</asp:ListItem>
                <asp:ListItem Value="Medische en sociale gevolgen bij kinderen met hepatitis ">Medische en sociale gevolgen bij kinderen met hepatitis </asp:ListItem>
                <asp:ListItem Value="Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?">Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?</asp:ListItem>
                <asp:ListItem Value="Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld">Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld</asp:ListItem>
                <asp:ListItem Value="Onderzoek">Trials: welke zijn er in Nederland en wat zijn de toekomstverwachtingen</asp:ListItem>
             </asp:DropDownList> 
             
             <span class="title">Derde voorkeur:</span>
<asp:DropDownList id="voorkeur_4_3" runat="server">
				<asp:ListItem Value="Geen voorkeur">Geen voorkeur</asp:ListItem>
             	<asp:ListItem Value="Psychologische problemen bij virale hepatitis">Psychologische problemen bij virale hepatitis</asp:ListItem>
                <asp:ListItem Value="Re-integratie">Re-integratie</asp:ListItem>
                <asp:ListItem Value="Medische en sociale gevolgen bij kinderen met hepatitis ">Medische en sociale gevolgen bij kinderen met hepatitis </asp:ListItem>
                <asp:ListItem Value="Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?">Hepatitis B : Algemene informatie, onderzoek en (nieuwe) behandeling. Wanneer wordt er gestart met de behandeling? Wanneer ben je drager en wat betekent dit?</asp:ListItem>
                <asp:ListItem Value="Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld">Hepatitis C: Algemene informatie, Wanneer wordt er wel/ niet behandeld,Wat is het beleid bij patiënten die niet worden behandeld</asp:ListItem>
                <asp:ListItem Value="Onderzoek">Trials: welke zijn er in Nederland en wat zijn de toekomstverwachtingen</asp:ListItem>
             </asp:DropDownList> 
           	
             
           </div>
           <span id="chbLidVanContainer">
             <asp:checkbox ID="chbLidVan" onclick="return checkLidVan(chbLidVan);" runat="server" Value="80" text=" Ja, ik ben lid van de Nederlandse Leverpatiënten Vereniging"/></span>
        </div>
        
        
     <p>
        Ik wil graag een Treinkaartje retour tweede klas (&euro; 15,-):
    </p>
    
    <div>        
        <asp:RadioButton id="vervoerJa" runat="server" Text="Ja" onclick="return checkRbn1(vervoerJa);" GroupName="yesno" ></asp:RadioButton>
		<asp:RadioButton Checked="true" id="vervoerNee" runat="server" Text="Nee" onclick="return checkRbn2(vervoerNee);" GroupName="yesno" ></asp:RadioButton>
    </div>
    <br />
    <div>
        <table>
            <tr>
                <td valign="top">Speciale dieetwensen:</td>
                <td>
                    <asp:TextBox ID="txtDieetWensen" class="txtBox" TextMode="MultiLine" Height="100" runat="server"></asp:TextBox></td>
            </tr>            
        </table>
    </div>
    
    <p>
    Het totaal bedrag (inclusief koffie, thee en lunch)van: &euro;  <asp:Label id="totaalprijs" runat="server"></asp:Label>,- dient voor 1 januari 2010 binnen te zijn op rekeningnummer 65.33.79.811 tnv Nationaal Hepatitis Centrum te Amersfoort onder vermelding van uw naam en de datum van de dag welke u wilt bezoeken (19,21 of 23)
    </p>
    
    <div id="button">
        <asp:LinkButton ID="cmdSave" runat="server" OnClick="cmdSave_Click">Verzenden</asp:LinkButton>
       
    </div>
    
    <p>
    * Verplicht in te vullen.
    </p>
    
 <asp:TextBox ID="txtHiddenPrice" Text="0" runat="server" Width="0px" BackColor="Transparent" CssClass="hiddenfield" ForeColor="White" BorderStyle="None" ReadOnly="true"></asp:TextBox>
    </div>

   
    </form>
	</div>
    
    <script type="text/javascript"> 			
	/*
			var rblInfo1_test =document.getElementById('rblInfo1');
			rblInfo1_test.checked = false;
			
			var rblInfo2_test =document.getElementById('rblInfo2');
			rblInfo2_test.checked = false;
			
			var rblInfo3_test =document.getElementById('rblInfo3');
			rblInfo3_test.checked = false;
		*/	
			var rblInfo4_test =document.getElementById('rblInfo4');
			
			var chbLidVan_test =document.getElementById('chbLidVan');

			
			
			var chbKeuze01 =document.getElementById('rblInfo1_keuze');
			chbKeuze01.style.display = 'none';
			
			var chbKeuze03 =document.getElementById('rblInfo3_keuze');
			chbKeuze03.style.display = 'none';
			
			var chbKeuze04 =document.getElementById('rblInfo4_keuze');
			chbKeuze04.style.display = 'none';
			
			var totalPriceHidden =document.getElementById('txtHiddenPrice');
			//chbKeuze04.style.display = 'none';
			
			
			//var chb01 = document.getElementById('rblInfo1');
			//alert(chb01.checked);
			
			var totaalprijsSpan =document.getElementById('totaalprijs');
			
			
			var totaalBedrag = totalPriceHidden.value;
			totaalprijsSpan.innerHTML = totaalBedrag;
			//totalPriceHidden.value = totaalBedrag;
			
			function checkChb1(ID) {
				if (ID.checked == 1) {
					totaalBedrag = Number(totaalBedrag) + 80;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
					chbKeuze01.style.display = "block";
				} else if (ID.checked == 0) {
					chbKeuze01.style.display = 'none';
					totaalBedrag = Number(totaalBedrag) - 80;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
				}
			} 
			
			function checkChb2(ID) {
				if (ID.checked == 1) {
					totaalBedrag = Number(totaalBedrag) + 80;
					totaalprijsSpan.innerHTML = totaalBedrag;		
					totalPriceHidden.value = totaalBedrag;
				} else if (ID.checked == 0) {
					totaalBedrag = Number(totaalBedrag) - 80;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
				}
			} 
			
			function checkChb3(ID) {
				if (ID.checked == 1) {
					totaalBedrag = Number(totaalBedrag) + 80;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
					chbKeuze03.style.display = "block";
				} else if (ID.checked == 0) {
					chbKeuze03.style.display = 'none';
					totaalBedrag = Number(totaalBedrag) - 80;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
				}
			} 
			
			function checkChb4(ID) {
				if (ID.checked == 1 && chbLidVan_test.checked == 1) {
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
					chbKeuze04.style.display = "block";
				} else if (ID.checked == 1) {
					totaalBedrag = Number(totaalBedrag) + 20;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
					chbKeuze04.style.display = "block";
				
				} else if (ID.checked == 0 && chbLidVan_test.checked == 1) {	
					//totaalBedrag = Number(totaalBedrag) + 20;
					//chbLidVan_test.checked = 0;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
					chbKeuze04.style.display = "block";
				} else if (ID.checked == 0) {

					totaalBedrag = Number(totaalBedrag) - 20;
					chbKeuze04.style.display = 'none';				
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
				
					
					
				}
			} 
			
			function checkRbn1(ID) {
				totaalBedrag = Number(totaalBedrag) + 15;
				totaalprijsSpan.innerHTML = totaalBedrag;
				totalPriceHidden.value = totaalBedrag;
			} 
			
			function checkRbn2(ID) {
				totaalBedrag = Number(totaalBedrag) - 15;
				totaalprijsSpan.innerHTML = totaalBedrag;
				totalPriceHidden.value = totaalBedrag;
			} 
			
			function checkLidVan(ID) {
				if (ID.checked == 1 && rblInfo4_test.checked == 1) {
					totaalBedrag = Number(totaalBedrag) - 20;
					totaalprijsSpan.innerHTML = totaalBedrag;				
					totalPriceHidden.value = totaalBedrag;
					
				} else if (ID.checked == 0 && rblInfo4_test.checked == 1) {
					
					totaalBedrag = Number(totaalBedrag) + 20;
					totaalprijsSpan.innerHTML = totaalBedrag;
					totalPriceHidden.value = totaalBedrag;
				}
			} 

			
			
          </script>

</body>
</html>

