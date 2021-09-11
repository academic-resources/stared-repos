# To change the location to the current item in the PowerShell ISE editor.
Function Set-LocationToCurrentIseItem
{
	if ($null -eq $psISE)
	{
		Write-Error 'Function only supported in PowerShell ISE'
	}
	else
	{
		Set-Location (Split-Path $psISE.CurrentFile.FullPath -Parent)
	}
}