<%@ Page Language="VB" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<script runat="server">

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs)
        divMessage.InnerHtml = ""    
    End Sub

    Protected Sub cmdSave_Click(ByVal sender As Object, ByVal e As System.EventArgs)
        Dim strMelding As String = ""
        
        Dim strInfo As String = ""
        If rblInfo1.Checked = True Then strInfo += "509452,"
        If rblInfo2.Checked = True Then strInfo += "508805"
        
        If strInfo = "" Then strMelding += "Er is nog geen beoordelingspakket aangevinkt<br/>"
        If txtSchoolNaam.Text = "" Then strMelding += "Naam school niet ingevuld<br/>"
        If txtSchoolAdres.Text = "" Then strMelding += "Adres school niet ingevuld<br/>"
        If txtSchoolPostcode.Text = "" Then strMelding += "Postcode school niet ingevuld<br/>"
        If txtSchoolPlaats.Text = "" Then strMelding += "Plaats school niet ingevuld<br/>"
        
        If txtPersNaam.Text = "" Then strMelding += "Naam niet ingevuld<br/>"
        If txtPersAdres.Text = "" Then strMelding += "Adres niet ingevuld<br/>"
        If txtPersPostcode.Text = "" Then strMelding += "Postcode niet ingevuld<br/>"
        If txtPersPlaats.Text = "" Then strMelding += "Plaats niet ingevuld<br/>"
        If txtPersTelefoon.Text = "" Then strMelding += "Telefoonnummer niet ingevuld<br/>"
        If txtPersEmail.Text = "" Then strMelding += "E-mailadres niet ingevuld<br/>"
        If rblJaar.SelectedIndex = -1 Then strMelding += "Niet alle vragen zijn beantwoord<br/>"
        If rblEerder.SelectedIndex = -1 Then strMelding += "Niet alle vragen zijn beantwoord<br/>"
        
        If strMelding <> "" Then
            divMessage.InnerHtml = strMelding
            Exit Sub
        End If
        
        
        'Dim strFout As String
        Dim myMail As New Mail.MailMessage
        Dim strBody As String


        strBody += "<html><body>"
        
        strBody += "<h3>Bestelling</h3>"
        strBody += "<p><strong>Te ontvangen pakket(ten): </strong>" & strInfo & "</p>"
        strBody += "<p><strong>Aanvrager wil dat er contact wordt opgenomen voor meer informatie: </strong>" & rblEerder.SelectedValue & "</p>"
        strBody += "<p><strong>Start met nieuwe methode in: </strong>" & rblJaar.SelectedValue & "</p>"
        
        
        strBody += "<h3>Schoolgegevens</h3>"
        strBody += "<p><strong>Naam school: </strong>" & txtSchoolNaam.Text & "</p>"
        strBody += "<p><strong>Adres: </strong>" & txtSchoolAdres.Text & "</p>"
        strBody += "<p><strong>Postcode: </strong>" & txtSchoolPostcode.Text & "</p>"
        strBody += "<p><strong>Plaats: </strong>" & txtSchoolPlaats.Text & "</p>"
 
        strBody += "<h3>Persoonlijke gegevens</h3>"
        strBody += "<p><strong>Naam: </strong>" & txtPersNaam.Text & "</p>"
        strBody += "<p><strong>Adres: </strong>" & txtPersAdres.Text & "</p>"
        strBody += "<p><strong>Postcode: </strong>" & txtPersPostcode.Text & "</p>"
        strBody += "<p><strong>Plaats: </strong>" & txtPersPlaats.Text & "</p>"
        strBody += "<p><strong>Telefoon: </strong>" & txtPersTelefoon.Text & "</p>"
        strBody += "<p><strong>E-mail: </strong>" & txtPersEmail.Text & "</p>"

        strBody += "</body></html>"

        myMail.From = "info@malmberg.nl"
        myMail.To = "klantenservice.vo@malmberg.nl"
        'myMail.To = "koenextra2@gmail.com"
        'myMail.Cc = "koenextra@yahoo.com"
        'myMail.Cc = "lieven@bitsquad.nl"

        myMail.Subject = "orderreden PO1 betaald"
        myMail.BodyFormat = Mail.MailFormat.Html
        myMail.Body = strBody

        Mail.SmtpMail.SmtpServer = "mail.complat.nl"

        Mail.SmtpMail.Send(myMail)
        
        divMessage.InnerHtml = "Dank u voor uw aanvraag. U ontvangt het beoordelingspakket zo snel mogelijk."
        divForm.Visible = False
    End Sub
</script>

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <title></title>
	<link href="_css/formsEm.css" rel="stylesheet" type="text/css" media="screen" /></head>

</head>
<body>
<div id="wrapper">
www.hetleukevaneconomie.nl

    <form id="form1" runat="server">
    <div runat="server" id="divMessage" style="color:#CC0000;"></div>
    
    <div runat="server" id="divForm">
        <strong>
    Ja, stuur mij een beoordelingspakket van Economisch bekeken vmbo bovenbouw. </strong><br />
(NB: Alleen volledig ingevulde formulieren kunnen in behandeling worden genomen)
        <p>Ik ontvang graag het beoordelingspakket voor: *</p>
       <div>
           <asp:checkbox ID="rblInfo1" runat="server" Value="509452" text=" 3-4 vmbo-b € 10,17 (t.w.v. € 67,80)"/><br />
           <asp:checkbox ID="rblInfo2" runat="server" Value="508805" text=" 3-4 vmbo-kgt € 13,46 (t.w.v. € 89,70)"/>
        </div>
    
    
     <p>
  Neem contact met me op voor meer informatie over Economisch bekeken: *</p>
    
    <div>
        <asp:RadioButtonList ID="rblEerder" RepeatDirection="Horizontal"  runat="server">
            <asp:ListItem   Value="ja"> Ja</asp:ListItem>
            <asp:ListItem Value="nee"> Nee</asp:ListItem>
        </asp:RadioButtonList>
    </div>
    
    
    <p>
Ik start met een nieuwe methode voor economie in vmbo bovenbouw: *
    </p>
    
    <div>
        <asp:RadioButtonList RepeatDirection="Horizontal" ID="rblJaar" runat="server" >
            <asp:ListItem  Value="komend schooljaar "> komend schooljaar </asp:ListItem>
            <asp:ListItem Value="later"> later</asp:ListItem>
        </asp:RadioButtonList>
    </div>
    
   
    
    <div>
        <table>
            <tr>
                <td><h2>Schoolgegevens</h2></td>
                <td></td>
            </tr>
            <tr>
                <td>Naam school *</td>
                <td>
                    <asp:TextBox ID="txtSchoolNaam" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            
            <tr>
                <td>Adres *</td>
                <td>
                    <asp:TextBox ID="txtSchoolAdres" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Postcode *</td>
                <td><asp:TextBox ID="txtSchoolPostcode" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Plaats *</td>
                <td>
                    <asp:TextBox ID="txtSchoolPlaats" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td><h2>Persoonlijke gegevens</h2></td>
                <td></td>
            </tr>
            <tr>
                <td>Naam *</td>
                <td>
                    <asp:TextBox ID="txtPersNaam" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Adres *</td>
                <td>
                    <asp:TextBox ID="txtPersAdres" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Postcode *</td>
                <td><asp:TextBox ID="txtPersPostcode" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Plaats *</td>
                <td><asp:TextBox ID="txtPersPlaats" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>Telefoon *</td>
                <td><asp:TextBox ID="txtPersTelefoon" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>
            <tr>
                <td>E-mail *</td>
                <td><asp:TextBox ID="txtPersEmail" class="txtBox" runat="server"></asp:TextBox></td>
            </tr>

        </table>
    </div>
    
    
    
    <div id="button">
        <asp:LinkButton ID="cmdSave" runat="server" OnClick="cmdSave_Click">Verzenden</asp:LinkButton>
    </div>
    
    <p>
    * Verplicht in te vullen.
    </p>
    
    </div>
    <div class="small">
        De verwerking van persoonsgegevens in de ASSU Onderwijsdatabank is aangemeld bij het College Bescherming Persoonsgegevens. Bij het gebruik van persoonsgegevens handelen wij conform de WBP. Voor ons privacyreglement en het inzien en wijzigen van uw gegevens verwijzen wij u naar <a href="http://www.assu.nl" target="_blank">www.assu.nl</a>. 
    </div>
   
    </form>
	</div>
</body>
</html>

